export const Hero = () => {
  return (
    <section className="text-black bg-slate-100 dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-center pt-20">
        <h2 className="text-black border-2 px-3 p-2 rounded-full text-center border-blue-500 dark:text-white dark:border-white">
          See What's New | <span className='text-blue-500 dark:text-sky-300'>AI Diagram</span>
        </h2>
      </div>
      <div className="mx-auto h-screen max-w-screen-xl px-4 py-12 lg:flex">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="
          bg-gradient-to-r 
          from-green-300 
          via-blue-500 
          to-purple-600 
          bg-clip-text 
          text-3xl 
          font-extrabold 
          text-transparent 
          sm:text-5xl"
          >
            Documents & diagrams
            <span className="sm:block h-16"> for engineering teams </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            All-in-one markdown editor, collaborative canvas, and
            diagram-as-code builder
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="
              block 
              w-full 
              rounded
              border-2
              border-blue-600 
              px-12 
              py-3
              text-sm 
              font-medium 
              text-black
              bg-slate-200
              focus:outline-none 
              focus:ring 
              active:border-blue-500 
              sm:w-auto
              dark:bg-slate-900
              dark:text-white
              "
              href="#"
            >
              Try Eraser -{'>'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
