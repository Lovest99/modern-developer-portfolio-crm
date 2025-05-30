import React from 'react';

const CodeGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.015] dark:opacity-[0.025]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {/* Code-like patterns */}
      <div className="hidden sm:block">
        {/* Top left code block */}
        <div className="absolute top-[10%] left-[5%] font-mono text-xs opacity-10 dark:opacity-15 text-cyan-600 dark:text-cyan-400 whitespace-pre">
          {`function initApp() {
  const app = createApp();
  app.use(router);
  app.mount('#app');
  return app;
}`}
        </div>

        {/* Bottom right code block */}
        <div className="absolute bottom-[15%] right-[8%] font-mono text-xs opacity-10 dark:opacity-15 text-purple-600 dark:text-purple-400 whitespace-pre">
          {`export default {
  name: 'Component',
  props: {
    title: String,
    items: Array
  },
  setup(props) {
    // Logic here
  }
}`}
        </div>

        {/* Middle left code block */}
        <div className="absolute top-[40%] left-[12%] font-mono text-xs opacity-10 dark:opacity-15 text-blue-600 dark:text-blue-400 whitespace-pre">
          {`const [state, setState] = useState({
  loading: false,
  data: null,
  error: null
});`}
        </div>

        {/* Top right code block */}
        <div className="absolute top-[20%] right-[15%] font-mono text-xs opacity-10 dark:opacity-15 text-emerald-600 dark:text-emerald-400 whitespace-pre">
          {`@media (min-width: 768px) {
  .container {
    max-width: 100%;
    padding: 2rem;
  }
}`}
        </div>
      </div>
    </div>
  );
};

export default CodeGrid;
