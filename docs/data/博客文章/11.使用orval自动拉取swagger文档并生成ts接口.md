---
title: 使用orval自动拉取swagger文档并生成ts接口
desc: orval是一个开源的基于OpenAPI的接口测试工具，它可以自动从Swagger/OpenAPI文档中生成接口代码。
label:
  - JavaScript
date: 2025-09-17
---

## orval 介绍

orval 是一个开源的基于 OpenAPI 的接口测试工具，它可以自动从 Swagger/OpenAPI 文档中拉取接口信息并生成生成前端接口代码。

官方文档：[https://orval.dev/](https://orval.dev/)

## 安装

```zsh
pnpm add orval
```

## 配置

这里以 `swagger` 文档为例：

先创建一个 `api.gen.config.js` 文件，用来配置 `swagger` 信息：

```js
const path = require('path')

module.exports = [
  {
    name: 'task', // 接口生成的文件夹名称
    url: 'https://orion-gateway.sit.sf-express.com/task/v2/api-docs', // swagger 文档地址
    filters: { tags: [/^(?!gexAoi$)/] }, // 过滤某些接口
    outDir: path.resolve(__dirname, './src/api/task/index.ts'), // 输出文件路径
  },
]
```

创建一个 `orval` 的配置文件 `orval.config.ts`:

```ts
import type { Options } from 'orval'

import config from '../../api.gen.config.js'

function initConfig() {
  const result: { [key: string]: Options } = {}

  if (!Array.isArray(config)) {
    console.error('config must be an array')
    return
  }

  config.forEach(item => {
    const { name, filters, outDir } = item

    const options: Options = {
      input: {
        // target: url,
        target: `../swagger/${name}.json`,
        filters,
        override: {
          transformer: './transformer.cjs',
        },
      },
      output: {
        target: outDir,
        mode: 'tags',
        override: {
          mutator: {
            path: './mutator.ts',
            name: 'request',
          },
        },
      },
      hooks: {
        afterAllFilesWrite: ['npx prettier --write'],
      },
    }
    result[name] = options
  })

  return result
}

export default initConfig()
```

如果 `swagger` 文档可以直接通过请求获取，不需要鉴权，那么 `input.target` 字段可以直接填写 `swagger` 文档的地址。

如果需要鉴权，那么可以先把 `swagger` 文档下载到本地，然后配置 `input.target` 字段为本地文件路径。

## 获取 swagger 文档

```javascript
// scripts/fetch-swagger.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import config from '../../api.gen.config.js'

async function fetchSwagger() {
  config.forEach(async item => {
    const { name, url } = item
    const outputPath = path.resolve(__dirname, `../swagger/${name}.json`)
    const auth = 'Basic ' + Buffer.from('admin:Uac@2024').toString('base64')
    const res = await fetch(url, {
      headers: {
        Authorization: auth,
      },
    })

    const data = await res.json()

    // ✅ 创建目录
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })

    // ✅ 写入文件
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
    console.log(`✅ Swagger downloaded to ./swagger/${name}.json`)
  })
}

fetchSwagger().catch(console.error)
```

## 生成接口

如果 香自定义请求方法，可以新建 `mutator.ts`， 并在 `orval.config.ts` 中配置到 `output.override` 字段。

```typescript
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

export const request = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const promise = axios.request({
    ...config,
    ...options,
  })

  return promise
}
```

如果想修改 `swagger` 中的内容，比如可以通过修改 tags 的名字来修改生成的文件名。

可以新建 `transformer.cjs`，并在 `orval.config.ts` 中配置到 `input.override` 字段：

```javascript
// 名字是否包含中文
function includeChinese(str) {
  return /.*[\u4e00-\u9fa5]+.*$/.test(str)
}

// 去除所有空格然后首字母小写
function formatVariable(str) {
  return str.replace(/\s/g, '').replace(/^[A-Z]/, s => s.toLowerCase())
}

// 是否是合法的js变量名
function isValidVariableName(str) {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(str)
}

// 从路径中获取文件名
function getModuleNameFromPath(path) {
  const parts = path.split('/').filter(Boolean) // 去掉空
  // 假设格式固定为 /task/moduleName/apiName
  return parts.length >= 2 ? formatVariable(parts[1]) : null
}

function formatTagName(name, description) {
  if (includeChinese(name) || !isValidVariableName(name)) {
    if (includeChinese(description) || !isValidVariableName(description) || !description) {
      return null
    } else {
      return formatVariable(description)
    }
  }
  return formatVariable(name)
}

module.exports = inputSchema => {
  const tags = inputSchema.tags.reduce((acc, { name, description }) => {
    if (includeChinese(name) || !isValidVariableName(name)) {
      // 默认先尝试 description
      let formatName = formatTagName(name, description) ? formatTagName(name, description) : null
      // 如果 description 没有，就从 paths 里找 moduleName
      if (!formatName) {
        const pathEntry = Object.entries(inputSchema.paths).find(([_, pathItem]) =>
          Object.values(pathItem).some(operation => operation.tags.includes(name))
        )

        if (pathEntry) {
          const [path] = pathEntry
          formatName = getModuleNameFromPath(path) ? getModuleNameFromPath(path) : formatVariable(name)
        }
      }

      console.log(name, '---->', formatName)

      return { ...acc, [name]: formatName }
    } else {
      return acc
    }
  }, {})

  return {
    ...inputSchema,
    tags: inputSchema.tags.map(el => (tags[el.name] ? { ...el, name: tags[el.name] } : el)),
    paths: Object.entries(inputSchema.paths).reduce(
      (acc, [path, pathItem]) => ({
        ...acc,
        [path]: Object.entries(pathItem).reduce(
          (pathItemAcc, [verb, operation]) => ({
            ...pathItemAcc,
            [verb]: {
              ...operation,
              tags: operation.tags.map(tag => (tags[tag] ? tags[tag] : tag)),
            },
          }),
          {}
        ),
      }),
      {}
    ),
  }
}
```

最后新建入口文件 `index.js`：

```javascript
import { fileURLToPath, URL } from 'node:url'

import orval from 'orval'

const configPath = fileURLToPath(new URL('./orval.config.ts', import.meta.url))

orval.generate(configPath)
```

最后在 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "api:gen": "node ./api-gen/src/fetch-swagger.js && node ./api-gen/src/index.js"
  }
}
```

执行 `pnpm run api:gen` 即可生成接口文件。
