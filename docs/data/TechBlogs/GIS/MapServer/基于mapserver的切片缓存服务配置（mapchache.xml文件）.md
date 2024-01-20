# mapcache切片 配置文件详解

## mapcache.xml文件

**mapcache配置文件是一个xml文件，通过配置该文件来确定切片服务的类型以及特点，该文件在`mapserver\ms4w\apps\mapcache`目录下，包含以下配置项：**

```xml
<mapcache>
   <source>....</source>
   <cache>...</cache>
   <format>...</format>
   <grid>....</grid>
   <tileset>...</tileset>
   <service>...</service>
   <metadata>....</metadata>
</mapcache>
```

**下面是对每个配置项的详细说明。**

- ## Source

**`source`包含了mapcache切片可以查询并获取到的原始图像数据或服务，通常是一个可以用url访问到的wms服务。具体配置如下：**

```xml
<!-- name为source的名字,方便后续指定source，type为数据的服务类型，具体可配置项参考mapserver data sources -->
<source name="vmap0" type="wms">
       <!-- 当数据源为WMS服务是必须配置WMS服务的url地址 -->
   <http>
      <!-- 请求url地址 -->
      <url>http://127.0.0.1:8181/cgi-bin/mapserv.exe</url>
       <!-- 设置请求头 -->
       <headers>
           <User-Agent>...</User-Agent>
           <Referer>...</Referer>
       </headers>
       <!-- 设置请求超时 -->
      <connection_timeout>30</connection_timeout>
   </http>
   <!-- 指定WMS服务request为getMap -->
   <getmap>
      <!-- 指定WMS服务的其他参数，其中layers时必须要配置的选项 -->
      <params>
         <!-- 如果是基于mapserver发布的wms服务，则必须配置map选项，该选项为.map文件的绝对路径 -->
         <MAP>D:/mapserver/local.map</MAP>
         <!-- 请求格式，若要切片为mvt格式，则配置为 application/vnd.mapbox-vector-tile -->
         <FORMAT>image/png</FORMAT>
         <!-- 请求的图层名 -->
         <LAYERS>LNDARE_A,DEPARE_A1,DEPARE_A2,DEPARE_A3,DEPARE_A4</LAYERS>
      </params>   
   </getmap>
</source>
```

## Cache

**cache是切片后存放的位置，可以是文件夹、数据库，或者在线缓存等。具体配置如下：**

```xml
<!-- name为缓存配置的名字，type为储存类型，disk为储存在磁盘  -->
<cache name="disk" type="disk">
    <!-- 储存的路径 -->
    <base>E:/mapserver/ms4w/tmp/ms_tmp/cache</base>
</cache>

<!-- 可以通过设置layout为template，自定义储存路径  -->
<cache name="disk" type="disk" layout="template">
    <!-- 
		自定义储存的路径，其中：
		- {tileset}    ：   tileset的name
		- {grid}       ：   grid的name
		- {dim}        ：   切片的维度，具体可以查看mapeserver tile dimension
		- {ext}        ：   文件的格式
		- {x},{y},{z}  ：   切片的 x,y,z
	-->
    <base>E:/mapserver/ms4w/tmp/ms_tmp/cache/{tileset}#{grid}#{dim}/{z}/{x}/{y}.{ext}</base>
</cache>

<!-- 在线缓存模式，可以指定服务的地址和端口 -->
<cache name="memcache" type="memcache">
   <server>
      <host>localhost</host>
      <port>11211</port>
   </server>
</cache> 

<!-- 存在数据库 -->
<cache name="sqlitetemplate" type="sqlite3">
   <dbfile>E:/mapserver/ms4w/tmp/ms_tmp/cache/sqlitefile.db</dbfile>
   <pragma name="max_page_count">10000000</pragma>
</cache>  
```

##  Format

**输出的文件格式。具体配置如下：**

```xml
<!-- name为格式的名字，type为文件类型 -->
<format name="PNGQ_FAST" type ="PNG">
   <!-- 压缩格式，png格式可选best和fast -->
   <compression>fast</compression>
   <!-- 图像颜色 -->
  <colors>256</colors>
</format>

<format name="myjpeg" type ="JPEG">
   <!-- 质量，jpeg质量可选从0到100  -->
   <quality>75</quality>
   <!-- 图像光谱，默认值为ycbcr，也可以为rgb -->
   <photometric>ycbcr</photometric>
</format>

<!-- 矢量切片格式 -->
<format name="MVT" type="RAW">
  <extension>mvt</extension>
  <mime_type>application/vnd.mapbox-vector-tile</mime_type>
</format>
```

## Grid

**地图切片矩阵，包含切片的空间参考，地理范围，分辨率和需要切片的地图大小组成。具体配置如下：**

必要配置项：

  `<size>`：每张瓦片图的宽度和高度，单位为像素，必须为空格隔开的正整数。

  ```xml
  <!-- 256*256像素的图片 -->
  <size>256 256</size>
  ```

   `<extent>`：要切片的地理范围，必须指定四个数值，用空格隔开，顺序依次为minX，minY，maxX，maxY

  ```xml
  <!-- 全球范围 -->
  <extent>-180 -90 180 90</extent>
  ```

  `<srs>`：坐标系，通常为EPSG代号。仅用在接收WMS服务查找切片时。

  ```xml
  <!-- WGS84地理坐标系-->
  <srs>epsg:4326</srs>
  ```

  `<units>`：瓦片投影的投影单位，允许的值为：

    m   ： 米

    dd  ： 十进制度

    ft    ： 英尺

  ```xml
  <!-- 以度为单位 -->
  <units>dd</units>
  ```

  `<resolutions>`：切片后每个缩放级别的分辨率。必须以正浮点值的形式表示，用空格分隔，按从大到小的顺序排列，最大值对应缩放级别0。

  ```xml
  <!-- 17级缩放级别 -->
  <resolutions>0.703125000000000 0.351562500000000 0.175781250000000 8.78906250000000e-2 4.39453125000000e-2 2.19726562500000e-2 1.09863281250000e-2 5.49316406250000e-3 2.74658203125000e-3 1.37329101562500e-3 6.86645507812500e-4 3.43322753906250e-4 1.71661376953125e-4 8.58306884765625e-5 4.29153442382812e-5 2.14576721191406e-5 1.07288360595703e-5 5.36441802978516e-6</resolutions>
  ```

可选配置项：

  `<srsalias>`：针对`<srs>`的标记。可以指定多次，并且可以添加多个`<srs>`坐标。

  ```xml
  <srs>EPSG:310024802</srs>
  <srsalias>IGNF:GEOPORTALFXX</srsalias>
  <srsalias>EPSG:310024001</srsalias>
  ```

  `<metadata>`：元信息。

  `<title>`：瓦片的名称。
  `<WellKnownScaleSet>`：WMTS关键字

  ```xml
  <metadata>
      <title>This grid covers the area</title>
  	<WellKnownScaleSet>urn:ogc:def:wkss:OGC:1.0:GoogleCRS84Quad</WellKnownScaleSet>
  </metadata>
  ```

  `<origin>`：切片的原点。可配置为 `top-left`、`top-right`、`bottom-left`、`bottom-right`。默认为`bottom-left`。

  ```xml
  <!-- 指定原点为左上 -->
  <origin>top-left</origin>
  ```

预设的切片配置：

```xml
<!-- WGS84 grid -->
<grid name="WGS84">
   <metadata>
      <title>GoogleCRS84Quad</title>
      <WellKnownScaleSet>urn:ogc:def:wkss:OGC:1.0:GoogleCRS84Quad</WellKnownScaleSet>
   </metadata>
   <extent>-180 -90 180 90</extent>
   <srs>EPSG:4326</srs>
   <units>dd</units>
   <size>256 256</size>
   <resolutions>0.703125000000000 0.351562500000000 0.175781250000000 8.78906250000000e-2 4.39453125000000e-2 2.19726562500000e-2 1.09863281250000e-2 5.49316406250000e-3 2.74658203125000e-3 1.37329101562500e-3 6.86645507812500e-4 3.43322753906250e-4 1.71661376953125e-4 8.58306884765625e-5 4.29153442382812e-5 2.14576721191406e-5 1.07288360595703e-5 5.36441802978516e-6</resolutions>
</grid>
```

```xml
<!-- g grid -->
<grid name="g">
   <metadata>
      <title>GoogleMapsCompatible</title>
      <WellKnownScaleSet>urn:ogc:def:wkss:OGC:1.0:GoogleMapsCompatible</WellKnownScaleSet>
   </metadata>
   <extent>-20037508.3427892480 -20037508.3427892480 20037508.3427892480 20037508.3427892480</extent>
   <srs>EPSG:900913</srs>
   <srsalias>EPSG:3857</srsalias>
   <units>m</units>
   <size>256 256</size>
   <resolutions>156543.0339280410 78271.51696402048 39135.75848201023 19567.87924100512 9783.939620502561 4891.969810251280 2445.984905125640 1222.992452562820 611.4962262814100 305.7481131407048 152.8740565703525 76.43702828517624 38.21851414258813 19.10925707129406 9.554628535647032 4.777314267823516 2.388657133911758 1.194328566955879 0.5971642834779395</resolutions>
</grid>
```

```xml
<!-- GoogleMapsCompatible grid -->
<grid name="GoogleMapsCompatible">
   <metadata>
      <title>GoogleMapsCompatible</title>
      <WellKnownScaleSet>urn:ogc:def:wkss:OGC:1.0:GoogleMapsCompatible</WellKnownScaleSet>
   </metadata>
   <extent>-20037508.3427892480 -20037508.3427892480 20037508.3427892480 20037508.3427892480</extent>
   <srs>EPSG:3857</srs>
   <srsalias>EPSG:900913</srsalias>
   <units>m</units>
   <size>256 256</size>
   <resolutions>156543.0339280410 78271.51696402048 39135.75848201023 19567.87924100512 9783.939620502561 4891.969810251280 2445.984905125640 1222.992452562820 611.4962262814100 305.7481131407048 152.8740565703525 76.43702828517624 38.21851414258813 19.10925707129406 9.554628535647032 4.777314267823516 2.388657133911758 1.194328566955879 0.5971642834779395</resolutions>
</grid>
```

## Tileset

**地图切片的基本配置项，包含以上的配置，可以理解为入口配置。具体配置如下：**

```xml
<tileset name="test">
   <!-- <source>的name属性 -->
   <source>vmap0</source>
   <!-- <cache>的name属性 -->
   <cache>sqlite</cache>
   <!-- <grid>的name属性。-->
   <grid>g</grid>
   <!-- 可以通过restricted_extend指定切片范围，通过minzoom和maxroom指定最大最小缩放层级。-->
   <grid restricted_extent="-10 40 10 50" minzoom="4" maxzoom="17">WGS84</grid>
    <!-- 也可以指定ruleset来执行某种规则 -->
   <grid ruleset="rules">4326</grid>
   <!-- 设置中间网格，具体查看官方文档 -->
   <grid use_wms_intermediate_resolutions="true">mygrid</grid>
   <!-- 可选配置。用于响应GetCapabilities的元数据请求，可以放任何信息。 -->
   <metadata>
      <title>vmap0 map</title>
      <abstract>blabla</abstract>
      <keywords>
         <keyword>foo</keyword>
         <keyword>bar</keyword>
      </keywords>
   </metadata>
   <!-- 可选配置。向瓦片图添加水印，必须大小与瓦片图一致。-->
   <watermark>/path/to/static/watermark.png</watermark>
   <!-- 可选配置。瓦片的存储格式 -->
   <format>PNG</format>
   <!-- 切片元窗口的行数和列数，空格分隔。 -->
   <metatile>5 5</metatile>
   <!-- 地图边缘的切片缓冲 -->
   <metabuffer>10</metabuffer>
   <!-- 可选配置。瓦片过期值 -->
   <expires>3600</expires>
   <!-- 重新请求，缓冲更新的过期值 -->
   <auto_expire>86400</auto_expire>
   <!-- 可选配置。维度，WMTS服务的缓冲顺序，具体查看mapserver官方文档对dimension的介绍。 -->
   <dimensions>
      <dimension type="values" name="DIM1" default="foobar">foobar,foobarbaz,foo,bar</dimension>
      <dimension type="regex" name="MAPFILE" default="/path/to/mapfile.map">^(?!.*\.\.)[a-zA-Z0-9\./]*\.map$</dimension>
      <dimension name="ELEVATION" type="intervals" default="0">0/5000/1000</dimension>
   </dimensions>
</tileset>
```

## Services

**请求类型，至少应指定一个。**

```xml
<service type="wms" enabled="true">
   <!-- 
	    对WMS请求响应的配置。可选参数如下：
 			error     ：   404错误
			assemble  ：   通过组装缓存的切片来构建完整图像
			forward   ：   将请求转发到配置的源
    -->
   <full_wms>assemble</full_wms>
   <!-- 
		对完整WMS服务请求重新采样切片时的模式。可选参数如下：
			nearest   ：   快但质量差
			bilinear  ：   满但质量高
	-->
   <resample_mode>bilinear</resample_mode>
   <!-- 瓦片图的图像格式，<format>的name属性。-->
   <format allow_client_override="true">myjpeg</format>
</service>
<service type="wmts" enabled="true"/>
<service type="tms" enabled="true"/>
<service type="kml" enabled="true"/>
<service type="gmaps" enabled="true"/>
<service type="ve" enabled="true"/>
<service type="demo" enabled="true"/>
```

## Ruleset

**规则集包含一组规则。**

```xml
<!-- 规则集的名字 -->
<ruleset name="rules">
   <!-- 具体规则，可以配置多个。 -->
   <rule zoom_level="4 5 6 7">
      <!-- 可见范围集合，范围内的瓦片从缓冲中提取，范围外的瓦片将以配置好的颜色返回给客户端。 -->
      <visibility hidden_color="ff000000">
         <extent>228355 6085026 953704 7686970</extent>
      </visibility>
   </rule>
   <rule zoom_level="8 9 10">
      <visibility>
         <extent>335972 6099021 495792 6166722</extent>
         <extent>309336 6166722 644513 6273268</extent>
      </visibility>
   </rule>
</ruleset>
```

以上就是mapcache发布切片时常用的配置项，其他配置项可去官网查看。