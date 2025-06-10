import { ref, onMounted, onUnmounted } from 'vue';
import { useData } from 'vitepress';

const defaultQuotes = [
  '成功的路上并不拥挤，因为坚持的人不多。',
  '逆风的方向，更适合飞翔。我不怕千万人阻挡，只怕自己投降。',
  '生活不会辜负每一个努力的人，只要方向正确，慢一点也没关系。',
  '你现在的付出，都会是一种沉淀，它们会默默铺路，只为让你成为更好的人。',
  '不是因为看到希望才坚持，而是因为坚持才会看到希望。',
  '世界上只有一种真正的英雄主义，那就是认清生活的真相后依然热爱生活。',
  '每个优秀的人，都有一段沉默的时光。那段时光，是付出了很多努力却得不到结果的日子，我们把它叫做扎根。',
  '如果结果不如你所愿，就在尘埃落定前奋力一搏。',
  '你跑得慢，听到的是嘲笑声；你跑得快，听到的只有风声。',
  '人生没有白走的路，每一步都算数。',
];

const useQuotes = () => {
  const { theme } = useData();

  const quotes = theme.value?.quoteOptions?.quotes || defaultQuotes;
  const interval = theme.value?.quoteOptions?.interval || 2;

  const quote = ref(quotes[0]);
  let animationFrameId: number | null = null;

  const changeQuote = () => {
    const index = Math.floor(Math.random() * quotes.length);
    quote.value = quotes[index];
  };

  onMounted(() => {
    if (typeof window === 'undefined') return;

    let count = 0;
    const func = () => {
      if (count % (60 * interval) === 0) {
        changeQuote();
      }
      count++;
      animationFrameId = requestAnimationFrame(func);
    };
    animationFrameId = requestAnimationFrame(func);
  });

  onUnmounted(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });

  return { quote, changeQuote };
};
export default useQuotes;
