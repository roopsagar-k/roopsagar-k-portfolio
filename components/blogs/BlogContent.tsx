// "use client";

// import type { Blog } from "@/types/types";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useMediaQuery } from "react-responsive";
// import js from "highlight.js/lib/languages/javascript";
// import ts from "highlight.js/lib/languages/typescript";
// import "highlight.js/styles/atom-one-dark.css";
// import { cn } from "@/lib/utils";
// import { processBlogHtml } from "@/lib/processBlogHtml";
// import { toKebabCase } from "@/lib/utils";

// const BlogContent = ({ blog }: { blog: Blog }) => {
//   const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
//   const [activeSection, setActiveSection] = useState<string | null>(null);
//   const [processedHtml, setProcessedHtml] = useState<string>(blog.html || "");

//   useEffect(() => {
//     const processHtml = async () => {
//       const result = await processBlogHtml(blog.html || "");
//       setProcessedHtml(result);
//     };

//     processHtml();
//   }, [blog.html]);

//   const scrollToSection = (section: string) => {
//     const id = toKebabCase(section);
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // Track active section on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       if (blog.tableOfContents.length === 0) return;

//       const sections = blog.tableOfContents.map((section) => {
//         const id = toKebabCase(section);
//         const element = document.getElementById(id);
//         if (!element) return { id, top: 0 };

//         const rect = element.getBoundingClientRect();
//         return {
//           id,
//           top: rect.top,
//           section,
//         };
//       });

//       const visibleSections = sections.filter(
//         (section) => section.top < window.innerHeight / 2
//       );

//       if (visibleSections.length > 0) {
//         const currentSection =
//           visibleSections[visibleSections.length - 1].section;
//         setActiveSection(currentSection!);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // Check on initial load

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [blog.tableOfContents]);

//   return (
//     <div className="w-full bg-foreground py-8 px-4 md:px-8">
//       <div className="max-w-[95rem] mx-auto rounded-lg overflow-hidden">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
//           {/* Table of Contents - Left Column (or Top on Mobile) */}
//           <div className="md:col-span-3 order-1 text-lg sticky top-0 bg-foreground/90 backdrop-blur-md rounded-lg p-4 shadow-sm">
//             <div
//               className={`rounded-lg p-4 shadow-sm ${
//                 !isMobile ? "sticky top-24" : ""
//               }`}
//             >
//               <h3 className="text-2xl font-semibold text-background mb-4">
//                 Table of Contents
//               </h3>
//               <nav className="space-y-2">
//                 {blog.tableOfContents.map((section, index) => (
//                   <div key={index}>
//                     <button
//                       onClick={() => scrollToSection(section)}
//                       className={`text-left w-full px-2 py-1 text-accent hover:text-primary rounded hover:underline transition-colors ${
//                         activeSection === section
//                           ? "bg-foreground/10 font-medium"
//                           : ""
//                       }`}
//                     >
//                       {section}
//                     </button>
//                   </div>
//                 ))}
//               </nav>
//             </div>
//           </div>

//           {/* Blog Content - Center Column */}
//           <div className="md:col-span-6 order-2">
//             <article className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
//               {/* Blog content using dangerouslySetInnerHTML */}
//               <div
//                 className={cn(
//                   "prose max-w-none w-full text-lg",
//                   // Headings
//                   "[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-8",
//                   "[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:mb-5 [&_h2]:mt-7",
//                   "[&_h3]:text-2xl [&_h3]:font-medium [&_h3]:mb-4 [&_h3]:mt-6",
//                   "[&_h4]:text-xl [&_h4]:font-normal [&_h4]:mb-3 [&_h4]:mt-5",
//                   "[&_h5]:text-lg [&_h5]:font-light [&_h5]:mb-2 [&_h5]:mt-4",
//                   "[&_h6]:text-base [&_h6]:font-thin [&_h6]:mb-1 [&_h6]:mt-3",

//                   // Lists - added custom colors for bullets and numbers
//                   "[&_ul]:list-disc [&_ul]:pl-4 [&_ul_li]:marker:text-background",
//                   "[&_ol]:list-decimal [&_ol]:pl-4 [&_ol_li]:marker:text-background",

//                   // Paragraphs
//                   "[&_p]:my-4 [&_p]:text-justify [&_p]:text-xl [&_p]:font-medium",

//                   //code blocks
//                   "[&_pre]:bg-secondary [&_pre]:p-0 [&_pre]:rounded-md [&_pre]:my-4 [&_pre]:overflow-x-auto",
//                   "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-md",
//                   "[&_code]:bg-secondary/50 [&_code]:text-foreground [&_pre_&]:bg-transparent  [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:text-lg",

//                   // Blockquotes
//                   "[&_blockquote]:italic [&_blockquote]:text-base [&_blockquote]:text-white [&_blockquote]:bg-secondary",
//                   "[&_blockquote]:border-l-[6px] [&_blockquote]:border-primary [&_blockquote]:p-3 [&_blockquote]:my-4 [&_blockquote]:rounded-md",

//                   // Links
//                   "[&_a]:text-primary [&_a]:underline",

//                   // Images
//                   "[&_img]:my-4 [&_img]:rounded-md [&_img]:max-h-[500px]",

//                   // Highlight/mark
//                   "[&_mark]:text-black [&_mark]:bg-yellow-300",

//                   // Text alignment
//                   "[&_.text-left]:text-left",
//                   "[&_.text-center]:text-center",
//                   "[&_.text-right]:text-right",
//                   "[&_.text-justify]:text-justify"
//                 )}
//                 dangerouslySetInnerHTML={{ __html: processedHtml as string }}
//               />
//             </article>
//           </div>

//           {/* Right Column - Card */}

//           <div className="md:col-span-3 order-3">
//             <div className={`${!isMobile ? "sticky top-24" : ""}`}>
//               <Card className="bg-primary/10 backdrop-blur-lg shadow-lg rounded-2xl p-6 border border-primary">
//                 <CardHeader>
//                   <CardTitle className="text-primary text-lg font-semibold">
//                     AI Tools to Boost Your Job Search
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted-foreground mb-4">
//                     Struggling with job applications? <b>Resumetweaker</b> helps
//                     you craft the perfect <b>resume</b> and <b>cover letter</b>,
//                     practice with an <b>AI-powered interview</b>, and even{" "}
//                     <b>track job applications</b> effortlessly. Let AI simplify
//                     your job search and give you an edge.
//                   </p>
//                 </CardContent>
//                 <CardFooter>
//                   <Button
//                     className="w-full bg-primary text-white hover:bg-primary/90 hover:text-primary hover:underline"
//                     onClick={() =>
//                       window.open("https://resumetweaker.wibblit.com", "_blank")
//                     }
//                   >
//                     Try Resumetweaker
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogContent;

"use client";

import type { Blog } from "@/types/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMediaQuery } from "react-responsive";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/atom-one-dark.css";
import { cn } from "@/lib/utils";
import { processBlogHtml } from "@/lib/processBlogHtml";
import { toKebabCase } from "@/lib/utils";

const BlogContent = ({ blog }: { blog: Blog }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [processedHtml, setProcessedHtml] = useState<string>(blog.html || "");

  useEffect(() => {
    const processHtml = async () => {
      const result = await processBlogHtml(blog.html || "");
      setProcessedHtml(result);
    };

    processHtml();
  }, [blog.html]);

  const scrollToSection = (section: string) => {
    const id = toKebabCase(section);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (blog.tableOfContents.length === 0) return;

      const sections = blog.tableOfContents.map((section) => {
        const id = toKebabCase(section);
        const element = document.getElementById(id);
        if (!element) return { id, top: 0 };

        const rect = element.getBoundingClientRect();
        return {
          id,
          top: rect.top,
          section,
        };
      });

      const visibleSections = sections.filter(
        (section) => section.top < window.innerHeight / 2
      );

      if (visibleSections.length > 0) {
        const currentSection =
          visibleSections[visibleSections.length - 1].section;
        setActiveSection(currentSection!);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [blog.tableOfContents]);

  return (
    <div className="w-full bg-foreground py-8 px-4 md:px-8">
      <div className="max-w-[80rem] mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Table of Contents - Left Column */}
          <div className="md:w-1/4 md:sticky md:top-24 md:self-start md:h-[calc(100vh-6rem)] md:overflow-y-auto">
            <div className="bg-foreground/90 backdrop-blur-md rounded-lg p-4 shadow-sm">
              <h3 className="text-xl font-semibold text-background mb-4">
                Table of Contents
              </h3>
              <nav className="md:space-y-1">
                {blog.tableOfContents.map((section, index) => (
                  <div key={index}>
                    <button
                      onClick={() => scrollToSection(section)}
                      className={`text-left text-base w-full px-2 py-1 text-accent hover:text-primary rounded hover:underline transition-colors ${
                        activeSection === section
                          ? "text-primary font-medium"
                          : ""
                      }`}
                    >
                      {section}
                    </button>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Blog Content - Center Column */}
          <div className="md:w-2/4">
            <article className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
              <div
                className={cn(
                  "prose max-w-none w-full text-lg",
                  // Headings
                  "[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-8",
                  "[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:mb-5 [&_h2]:mt-7",
                  "[&_h3]:text-2xl [&_h3]:font-medium [&_h3]:mb-4 [&_h3]:mt-6",
                  "[&_h4]:text-xl [&_h4]:font-normal [&_h4]:mb-3 [&_h4]:mt-5",
                  "[&_h5]:text-lg [&_h5]:font-light [&_h5]:mb-2 [&_h5]:mt-4",
                  "[&_h6]:text-base [&_h6]:font-thin [&_h6]:mb-1 [&_h6]:mt-3",

                  // Lists - added custom colors for bullets and numbers
                  "[&_ul]:list-disc [&_ul]:pl-4 [&_ul_li]:marker:text-background",
                  "[&_ol]:list-decimal [&_ol]:pl-4 [&_ol_li]:marker:text-background",

                  // Paragraphs
                  "[&_p]:my-4 [&_p]:text-justify [&_p]:text-xl [&_p]:font-medium",

                  //code blocks
                  "[&_pre]:bg-secondary [&_pre]:p-0 [&_pre]:rounded-md [&_pre]:my-4 [&_pre]:overflow-x-auto",
                  "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-md",
                  "[&_code]:bg-secondary/50 [&_code]:text-foreground [&_pre_&]:bg-transparent  [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:text-lg",

                  // Blockquotes
                  "[&_blockquote]:italic [&_blockquote]:text-base [&_blockquote]:text-white [&_blockquote]:bg-secondary",
                  "[&_blockquote]:border-l-[6px] [&_blockquote]:border-primary [&_blockquote]:p-3 [&_blockquote]:my-4 [&_blockquote]:rounded-md",

                  // Links
                  "[&_a]:text-primary [&_a]:underline",

                  // Images
                  "[&_img]:my-4 [&_img]:rounded-md [&_img]:max-h-[500px]",

                  // Highlight/mark
                  "[&_mark]:text-black [&_mark]:bg-yellow-300",

                  // Text alignment
                  "[&_.text-left]:text-left",
                  "[&_.text-center]:text-center",
                  "[&_.text-right]:text-right",
                  "[&_.text-justify]:text-justify"
                )}
                dangerouslySetInnerHTML={{ __html: processedHtml as string }}
              />
            </article>
          </div>

          {/* Right Column - Card */}
          <div className="md:w-1/4 md:sticky md:top-24 md:self-start md:h-[calc(100vh-6rem)]">
            <Card className="bg-primary/10 backdrop-blur-lg shadow-lg rounded-2xl p-6 border border-primary">
              <CardHeader>
                <CardTitle className="text-primary text-lg font-semibold">
                  AI Tools to Boost Your Job Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Struggling with job applications? <b>Resumetweaker</b> helps
                  you craft the perfect <b>resume</b> and <b>cover letter</b>,
                  practice with an <b>AI-powered interview</b>, and even{" "}
                  <b>track job applications</b> effortlessly. Let AI simplify
                  your job search and give you an edge.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-primary text-white hover:bg-primary/90 hover:text-primary hover:underline"
                  onClick={() =>
                    window.open("https://resumetweaker.wibblit.com", "_blank")
                  }
                >
                  Try Resumetweaker
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;