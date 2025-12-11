import React, { useMemo } from "react";

export interface Product {
  title: string;
  link: string;
  thumbnail: string;
  size?: "sm" | "md" | "lg";
}

export const HeroParallax = ({
  products,
  header,
}: {
  products: Product[];
  header?: React.ReactNode;
}) => {
  // Split products into 3 columns
  const { firstColumn, secondColumn, thirdColumn } = useMemo(() => ({
    firstColumn: products.filter((_, i) => i % 3 === 0),
    secondColumn: products.filter((_, i) => i % 3 === 1),
    thirdColumn: products.filter((_, i) => i % 3 === 2),
  }), [products]);

  return (
    <div className="py-20 overflow-hidden">
      {header}
      <div className="mt-8 flex flex-row justify-center gap-4 md:gap-6 lg:gap-10 px-4 w-full max-w-7xl mx-auto">
        {/* Column 1 - scrolls up faster */}
        <div className="flex flex-col overflow-hidden h-[75vh]">
          <div className="flex flex-col space-y-6 md:space-y-10 parallax-auto-scroll-up-fast">
            {[...firstColumn, ...firstColumn].map((product, idx) => (
              <ProductCard
                product={product}
                key={`col1-${product.title}-${idx}`}
              />
            ))}
          </div>
        </div>
        
        {/* Column 2 - scrolls up */}
        <div className="flex flex-col overflow-hidden h-[75vh]">
          <div className="flex flex-col space-y-6 md:space-y-10 parallax-auto-scroll-up">
            {[...secondColumn, ...secondColumn].map((product, idx) => (
              <ProductCard
                product={product}
                key={`col2-${product.title}-${idx}`}
              />
            ))}
          </div>
        </div>
        
        {/* Column 3 - scrolls up */}
        <div className="flex flex-col overflow-hidden h-[75vh]">
          <div className="flex flex-col space-y-6 md:space-y-10 parallax-auto-scroll-up">
            {[...thirdColumn, ...thirdColumn].map((product, idx) => (
              <ProductCard
                product={product}
                key={`col3-${product.title}-${idx}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
}: {
  product: Product;
}) => {
  return (
    <div className="w-[30vw] md:w-[28vw] lg:w-[26rem] max-w-[26rem] relative shrink-0">
      <div className="relative rounded-2xl p-2 bg-background/20 backdrop-blur-xl border border-white/10 shadow-xl">
        <div className="relative rounded-xl overflow-hidden bg-black/40">
          <img
            src={product.thumbnail}
            className="w-full h-auto pointer-events-none"
            alt={product.title}
          />
        </div>
      </div>
    </div>
  );
};
