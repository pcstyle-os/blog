import type { AnchorHTMLAttributes, ComponentProps, HTMLAttributes } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Callout } from "./Callout";
import { CommandBlock } from "./CommandBlock";
import { StatusChip } from "./StatusChip";

const components = {
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className="mt-10 mb-4 text-2xl md:text-3xl font-black uppercase tracking-[0.1em] text-white"
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className="mt-8 mb-3 text-xl font-black uppercase tracking-[0.12em] text-[#ff00ff]"
    />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="text-gray-300 text-sm md:text-base leading-relaxed my-4" />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="list-disc list-inside text-gray-300 text-sm space-y-2 my-4" />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="leading-relaxed" />
  ),
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="text-[#ff00ff] hover:text-white underline underline-offset-4"
    />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="my-6 border border-[#ff00ff]/20 bg-black/60 px-4 py-3 text-xs text-gray-200 overflow-x-auto"
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => {
    const className = typeof props.className === "string" ? props.className : "";
    const isBlock = className.includes("language-");

    const baseClass = isBlock
      ? "text-xs text-gray-200"
      : "rounded bg-[#ff00ff]/10 px-1 py-0.5 text-[0.85em] text-[#ff00ff]";

    return <code {...props} className={[className, baseClass].filter(Boolean).join(" ")} />;
  },
  Callout,
  CommandBlock,
  StatusChip,
};

export function CustomMDX(props: ComponentProps<typeof MDXRemote>) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
