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
      <div className="mt-8 flex flex-row justify-center gap-2 md:gap-4 lg:gap-8 px-2 md:px-4 w-full max-w-7xl mx-auto overflow-hidden">
        {/* Column 1 - outer, slower */}
        <div className="flex flex-col overflow-hidden h-[75vh]">
          <div className="flex flex-col space-y-6 md:space-y-10 parallax-auto-scroll-down">
            {[...firstColumn, ...firstColumn].map((product, idx) => (
              <ProductCard
                product={product}
                key={`col1-${product.title}-${idx}`}
              />
            ))}
          </div>
        </div>
        
        {/* Column 2 - middle, faster */}
        <div className="flex flex-col overflow-hidden h-[75vh]">
          <div className="flex flex-col space-y-6 md:space-y-10 parallax-auto-scroll-down-fast">
            {[...secondColumn, ...secondColumn].map((product, idx) => (
              <ProductCard
                product={product}
                key={`col2-${product.title}-${idx}`}
              />
            ))}
          </div>
        </div>
        
        {/* Column 3 - outer, slower */}
        <div className="flex flex-col overflow-hidden h-[75vh]">
          <div className="flex flex-col space-y-6 md:space-y-10 parallax-auto-scroll-down">
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
    <div className="w-[26vw] md:w-[28vw] lg:w-[22rem] max-w-[22rem] relative shrink-0">
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
