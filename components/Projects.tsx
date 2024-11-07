import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
//@ts-ignore
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projectsData";
import Image from "next/image";

export default function Component() {
  return (
    <div className="w-full min-h-screen bg-background p-4 md:p-8 mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="group relative overflow-hidden bg-card/50 backdrop-blur-sm"
          >
            <CardHeader className="p-0">
              <div className="relative h-[250px] md:h-[350px]">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="w-full h-full rounded-xl object-cover object-top"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-2xl font-bold text-card-foreground mb-3">
                {project.title}
              </CardTitle>
              <p className="text-muted-foreground mb-6 line-clamp-2">
                {project.cardDescription}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="relative w-10 h-10 rounded-full border border-border bg-background/50 backdrop-blur-sm flex items-center justify-center hover:z-10 transition-transform"
                    >
                      <img
                        src={icon}
                        alt={`Technology ${index + 1}`}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-purple-500 font-medium text-xl hover:text-card-foreground group/button">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex"
                  >
                    Check Live Site
                    <ArrowUpRight className="ml-2 mt-1 w-4 h-4 transition-transform group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
