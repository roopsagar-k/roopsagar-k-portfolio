"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Highlight } from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Paragraph from "@tiptap/extension-paragraph";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { ToolBar } from "./Toolbar/ToolBar";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Heading from "@tiptap/extension-heading";
import { cn } from "@/lib/utils";
import { common, createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import "highlight.js/styles/atom-one-dark.css";
import { useState } from "react";
import { Button } from "../ui/button";
import { Node } from "@tiptap/core";
import { Send, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { parseBlogContent } from "@/lib/utils";
import createBlog from "@/actions/createBlog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Editor = () => {
  const { toast } = useToast();
  const lowlight = createLowlight(common);
  lowlight.register("javascript", js);
  lowlight.register("typescript", ts);
  const initialContent = ` <h1>The Adventures of <mark>Carto</mark> and <mark>Toon</mark>: A Creative Journey</h1>
  <p>Welcome to the fun world of Carto and Toon, two mischievous cartoon characters who explore the creative possibilities of the Tiptap Editor. Let's see what happens when they stumble upon some creative tools to bring their stories to life!</p>
  
  <h2>Chapter 1: The Bold Move</h2>
  <p>One day, Carto decided to take <strong>bold</strong> action and grab the attention of the readers. "I need to stand out!" he shouted. So, with a swift move, he made his plans <strong>boldly</strong> clear.</p>
  
  <h2>Chapter 2: The Power of Italics</h2>
  <p>Toon, being the more subtle of the two, decided to express some thoughts in <em>italics</em>. “This is a secret,” Toon whispered. It was a perfect way to hint at a hidden plot twist without giving it all away.</p>

  <h3>Chapter 3: The Code of the Cartoons</h3>
  <p>Carto and Toon wanted to create something more complex. So, they decided to write some <code>TypeScript</code> to automate their comic strip generation. Here's a snippet of their creative code:</p>
  <pre><code class="language-typescript">
    const characters = ['Carto', 'Toon'];
    function makeCartoon(character) {
      return \`\${character} saves the day!\`;
    }
  </code></pre>
  
  <h2>Chapter 4: The Blockquote Epiphany</h2>
  <p>As they ventured into the world of storytelling, Toon remembered a wise piece of advice from an old friend. "Remember," the friend said, <blockquote>"True creativity comes from the heart, not the brain."</blockquote> This insight gave them a new perspective on their artistic journey.</p>
  
  <h2>Chapter 5: Striking the Right Balance</h2>
  <p>Carto thought it was time to strike out anything that didn't fit the narrative. "Let’s get rid of the unnecessary fluff!" he said as he <s>crossed out</s> the irrelevant details in their story.</p>

  <h2>Chapter 6: Heading Toward the Finish Line</h2>
  <p>As their adventure came to a close, Carto and Toon thought about the structure of their work. They needed to organize it well, so they added some <h3>Heading 3</h3> and <h4>Heading 4</h4> to divide the chapters.</p>

  <h2>Chapter 7: The Link to Their Next Adventure</h2>
  <p>Excited to share their journey with others, Carto added a link to their website. “Check out our next cartoon series!” he said, linking to <a href="https://resumetweaker.wibblit.com" target="_blank">Cartoon Adventure</a>.</p>

  <h2>Chapter 8: The Art of Imagery</h2>
  <p>Toon knew that no story was complete without some visuals. So, she added a picture of their latest creation: the heroic Carto, ready for his next big adventure.</p>
  <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEA8PDxEQDQ8PDxAPEA4QEBAVEBAQFREWFhUVGBcYHiggGBonGxUVITEhJSkrLi4wGR8zODMtNystLisBCgoKDg0OGhAQGC0lICUtLS0tLS0tLS0tLS8tLS0tKysrLS0tLS0tKy0tKy0tLS0tLS0rLS0tLS0tLS0rLS0tLf/AABEIALcBEwMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQIDBAUGB//EAD4QAAIBAgMFBAcGBQMFAAAAAAECAAMRBBIhBTFBUWEGEyJxFDKBkaGx0QcjQlKSwTNicuHwsuLxQ1OCg7P/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBQQG/8QANhEAAgECBAIIBQQBBQEAAAAAAAECAxEEEiExQVEFEyJhcYGx8DKRocHRFELh8VIVIyQ0Ygb/2gAMAwEAAhEDEQA/APjU9R5xAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAM2Gw71GWnTVqjsbKigliegEiUlFXb0CTbsj2WzuwSgB9o4ujgF392LVKtuuoVT+qcer01STy0Yym+5afNnRp9F1pK8lbxO5gexOwq/go7SrVKvBS9AAnyyfvPO+nKlN3q4eajz0ZMujKluy16+jMG1fs/w1E2b0lPy1BUpsp96fSdvCYvDYuOalO/yv5o5lWlXpbpfX8nkNvdm3ww7xW76jcDOBZkJOgdeHK408tJ6p03FX3RlCrmeVqz97HBMzNhAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAWgE2gHV2VsGviCpQBabGxqMy2UDebXud26eTEY2lRvmeq4e9D2YfAVq9nFaPieswJSj3uFwJ7qsB95WqJ9/VFtbXtZQeA/vOFXlUr2qVvh4RT0XjzZ9Bh8NTo3hT+Lm9/I4uM7HY2urVlqriDc3R3IqfHSeqljaNPs5beB5sRgMRU7Wa/iear4Z6RAYNTdTbkQR1nujOM1pqjwypyptJ6M9r2X7f1aFsLjwcRhz4bv66D6Tl1+jssuvwjyy+jPRGspdiuvP8/k9bjsJTyd5SIr4SsMvOwYWKt9f8Pd6I6SWKTp1Faa3X3RxulOj5UO3Hbg+XI+U7ZwBw9apRNyFPhY/iQi6nzsRfreeqcHCTizzUqnWQUvfeaNpQ0IgkQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAJAggm0A9RgtlYWqoGqsVvmzkEn2gj4Tk1cTiKcnx8jvUcFhq0Fa6b7zf2SPRmagxqUgRdXaxVzmOqkG1rEA2M8mJm66VSyPdg6f6Zund89Sdt03e1QEM6apWpElh5j1plQai8vPgz0YiLazcVxRbs/tZzUKVWa+RiCd9xbQ87axiKKtdEYevJvLI19qVc7MtYCorbrjUeRlqayq8dCK1pO0ldHFq4NWBpNe4/hufWt+U+U9SqNdpeaPDOimsr8n9jd7H9o2wVU4av48LU8LA6hL8fKVxNBztiKDtOP17jGjNRvh62sX9P4Op9omzAvc4hDnQr3effddWS/UXYE9V5zt0cXHGUI1lo9pLk0fP1MLLB150JbfFF81t9NDw5Ekm5FoJIgEQSIAgCAIAgCAIAgCARAJgCAIAgCAIAgCAIAggkCAWAkkXLKPbATOr3uVQ1K+hva+o5jr/zOfVzXy1F58zrUHFLPSfiuR1dm7WFRCjAVAPWpte5H5hxB528/LwVaOV3Wh1aGJzrLLUnFYhaRD0nJU6ZW9ZL9eMpCDlpJGlSooaxZpVcX41q/iGjHmp0+Gk2VPSx53Vu8xnxOMIs6mzLqCJRU1ezNZVdLo1K2OLnxa3Fr77cQRNI00jGVZy3OPtFrkHjqJ6KStoeKu76nreymPOMweI2fVOaotMtQJ5jVB+qw90zpv8ATYpSXwVOy+6X7X8/Vla8P1WF/wDdLVd8f3L5fWx5FhOwzjFSJBJBEElSJBJFoJEAQBAEAQBAEAQBAEAQBAEAQBAEAQCYIJAkgsBBUsBJIuWCybEXN2mMtJ2PFgB0sNf9Q9082I1lCHNnrwvZhOpyVvNk4DBNVBq0zlZCut+JF+AnnlTdnyPbTqJtPZm3iMDVYXOXN0vY+yYKGU9UpuW5gGFqjQrcdCNIaITNnB7LxFTwohYfL3SrS4mkbvRHo8D9nWJZCzEKeCyjqxRbqn4HK7S9kXwaLUch85KtYaIeHv8ApLQq30RE6GVXZ53YGLOHxlFwbDOFP9LafOx9kviafWUJJb2uvI8+Hn1WIi+D0fgza29he6xFZBuDkqOSt4lHuInSw9TraManNI4+KpdTWlT5P6cDmlZqYplSILXKmQSVIgkiQSIAgCAIAgCAIAgCAIAgCAIAgCAIILAQCwEkqy4EkhsyKstYo2WAlitzbxqZcNT/AJix9tyPkBPDJ3xVuUfU6UFlwl+cvT+jJsLGPTo1VRO8d2pkaEhQA1ybeyUlNKL8TenTd1Y2/T8Vxpof/Wx+RnmckexRlyPY9kNnpiaSvVUK92DLYjcTY2PS0xqTa2PRSpp7noNt7Tp7NSiadBaveFgfFly2A5A7/wBpirzNttNjST7TVGhwlh0rf7I6tmbgt8xx+1PaShjsNUFMMjqMxpva4sbggjQi4EtTg4y1LTacLHzEUCxLg2ynw8yd86EZKOjOTOLk7rgei7Ti9Wm//coU3PnqP2Ev0V/17cm19TDphf8AJzLik/p/BxCs6DRzEzGRKl0yhEgm5UiQWKkSCSIJEAQBAEAQBAEAQBAEAQBAEACAWAkkFgIKsuoklWzIqyyRVsuBLlblgJJFzp4+lmwlJh+EEH9R/ecuUsuOafGK9/Q66jm6Pi1+2Wvz/kw9nELCqF1IVfhmmVdWZ68G80bo73a3YlfDpQfCI1RXQMWUFmZrm9l6eHd+aemFCMoNxVzwVcZUp1LSll+W/LU6fZbEurD19VUktTandsoLWUk6Bsy345T5DnYil1crM7WCxCrwzo3tt06uIqU6ai7uwRb7gTxPTefZMKersj11Xli5M8RVrVUxi4evmw9MsQ1Q03JCC9yAoJO63Gx37p0/0kdFZ6nA/wBTk7yTVk7f3rudba+y3oipn8WVLhitjlZb6jhvsR0M8btGeVM6ybnSztHAweFy09d7ZUXq7Eae8zRyvL3sjyqNoXfHTzZvdpbB6SD/AKdBV+JM9fRKf6fM+LbOd0zJfqMq4JL7/c4pE6NjlplCJVosmY2EqWTMZEguipkElTIJIgkQBAEAQBAEAQBAEAQBAEAkQQWAkkFwJJVmVRLJFGzIBLlGy0kgkSQdjZX3lKrRPEEr7f7/ADnJ6Ug4OFeP7XZ+/e51+ipqanh5fuV16P33G19mdNfSa6vyTQ+bXmOPeiaPf0RvJPc+x4TZFMrlV2RTr3dwUv5HQTnRqTjsz213FvtQT8UYG2HT9IUk62C3J0twlZTk92XhOMablGNvA2k2EjVbqfEhurKdQd15WMmndFamITp9pbm1iOzxY5qj0zqCT3S5iRuJvoToNbT0PG18uXM7HMVHBOp1nUJy5v3c8F9pHd0cNUtqTxJuzGUoXlUR1qs7Ydto+b7BrNiK6u9lSipcIPVGlr+evwnvxFPJRcY7yaivM5NCs6tZSl8MU5fIxY2t3ju5/Eb+Q4D3WnapUlSgoLgrHBrVXVqSm+Lua5lyhUiVJuUYSrRZMxMJUumYyJBZFSJBZFZBIgEQCYAgCAIAgCAIAgCABALCCGXEkqzIolkijZlUS6KMuBLFSbSSCwEki50NlBhUUqCeduC8SenH2TPEUetpShzX9GmHr9TWjU5P6cfoamLxbYLGmolwDqQOKNr85xqP+7h4p7rT5HeqSeHxMpR2evzPoGy9vVMSgaliO7sLjS9zyPKeOVLK9UdiFdVI3TN6r2irq6PQYPUChKlKoFvcH1lJ0I13j4SFRT1K1Ki+Fr7Hc2ZtWoqvUxFaitZwAlCkQzqOZC8b+wTOVO2xCcZ2jl0RoYztNXpX70qRwKtfSQoXNrU4v4T5Z2y7SNjHyA3RTrbcTynRwtDJ2mcnHYvrOxHYbGTJhqzbjUIpjy4/AmeuEesxMI/4py+yObOXVYScuMmo/LV/g1XWdRnJTMdpBYgyAVIlWWTMTCUaLpmIiVLopILFTIJIgkQBAEAQBAEAQBAEAQCRBBYSSDIoklWZVEujNmUCXRRkySCwkkHd7L7BbGVSt+7pUxnrVbeonTmx4D6GJSUVdkRi5yUUau1yxarTQ5aSu2VAABlv4b29Y2tqZ4XiJTSaejOjHCxpSatqtDnbZXvqOHrb2CmjUP8AMv11nhpdmrUhz7S89/qdCt26NOfLsvy2+hzdmYurQcFDa5F14NNakU1qZ0ZyhLQ9zszaIrbmCOLZlYAi/Ox09s8UlbU68J5jfxe0VoLdnBP5VAA9wlLXZq55UeL25teriBe5VCbW4kdZ6aUYxlZnPxNSUoabHNo0J6kc5o9C9dqKUaSGxFPPUGhBLm9iDoZTDVGpzqLi7eS09bmmLpxcIUpLZX85a+h08fsEnB0sdTsVYAV6aj+ExPhb+ki3kT1E6lKuql1xX4ucevQlRs3s9V87Hm2E0ZmmVMgkqZBJjYSjLowsJRmiMZlSyKmQWRWCRAEAQBAEAQBAEAQBALCCCwklTKglkVZlUS6M2ZBLFSQJJBsYbDs7BVBYk2AAuTLpGcpJI949dMJQTAL4cRpWxLC2rEaJ1AFhbp1nK6azRpKK47+H8nT/APnXGrVlVfDSP5PFbRYio3U6/X/OU82ElmpJcjo46FqrfM1MHUF6lBt1UhkJ4VBu940lqys1UXDfwf43KUHmTpc9V4r87GvWw2Ug8mF/fLzfZZSGkkbNWmaVVhuuFYe2eOEs0LnScXGROJckHjJQexnq4DLg6TN61RhbyEyp1c2JcVwFanlw6b42MGHpqDmfSmlmY9OQ6ndPdUk0uzu9vfcc6nFN3lst/feYjXao7OdGqNe3IbgPYLTSMVTgo8EjOUpVJuXFs97sTa1Ohlp1dcM1PuqqHcyFbbvlObgKklim/wDJ+/kdLpOjGWDyreK08vyeZ27stsPVZdSh8VN+D0zqp9xF59ZKLW58ZRqqcbo5JEzPQmVIlSxRhIZZGFxM2XRiaUNEVMElTILEQBAEAQBAEAQBAEACAWEEMussVZlSWRmzMsuijLgSxVmxhqBdgqgsSQAALkkmwAHOXSM5SsegKegV0V7MaTU2rEbixUOEB4geG/M+QlFVUaqUtiVQdahJrd6I4uPxrVqtSsx8VRy177tdJ469TrJt8PsdHD0lRpxguBrU89etTpAhmc5bngOLE8gNT5TKhhk6iUDfEYtxptzd7e/qTtMKtNaIAz+ux4g7vn8p5aScqspvZaHpqtRpRgt3qYkxXepZj956ub8/X+qXy5HlW3Du7vwVz51me/Hv7/Hn/Z6Wns9cbSoOjBay0yjA7iV3X9nynDdd4aclJaXud+NFV4Jp62Jo9lqgDNXyqqjRQ1y7HQC/AXt1kz6Rg7Knv6CGBlvPY1e0mJQ1EooQEoIFvwvxPz989PRtNqMqkt2zx9IzTaprZHFw+Jp1HCOPutygnUufxH5Dl7576sJxjnT1Xp735nPpVISlka7P35+9iK1B6IRzYqzuitfcy20PWxB9s9c6EpUoyezPHTrxjVlBbx/q5dqzPYs1/kJnClGHwo1qVZVNZM777UFelQVvEaVM06o4lA3hI6gE2nTqYlOMJJ68Tk08FadRcHqjS27sh8NVNN7HQMrrfK6Hcw/znNWYRlwOSRKM0KmQyyMLiZsujC0oaIpILFTIJIgkQBAEAiATAEAQBAEAsJJVmRZJVmVJdFGZhLozZmpLeXSKSZ6XZONobPqI9UNUrqQSFy2pc113sdx5a7+GrlGmu0jzOhUxK7DsvX+DDX2x3lRqq6d47Eg2NtwA91pza01OTkjs0KfVwUORkXaLcx+lfpMjUyJtFhqDY2IuAo0IsRuhNrYNJ7g45jroTzyr9JFiR6aen6V+kWFzJS2pUX1XKf02HylZU4y3SLxqTjtJrzMjbarnQ1XI5E6SqoU1tFfJFuvq/wCT+bMBxrHfY+ar9JokkZtt7kemHp+lfpFiCzbRcjKWut72IFr87c5N3axFle/EodoNzH6V+kgk16+02sRprvFl1gHUx23sNi6VGhVzq6KQKuUHI5PvK2sCOl9861GpTkst9Th1sNWjUdVJW5Lu+55XaGEak5Rt4tqNQQRcEHiCLGJxadmXpzUldGmZkamJ5Rl0YGmZoihkFyhkEkQSIAgCAIAgCAIAgEwCwkoqy6ySrMyS6M2ZlmiKM7HZ3CipXphiqUw2eq7GypSTxOSeGgPwmi01PLXk1F2V3w8eBl7Urha1d3wlQ5XYk94rBbk8NL28xPNiqsJu8Xrx5Ht6PpVoU1Gql9/M5dHCPSF2ZGBIsUe/DW4NiJ5E7o973NhHgGUVIBYVIBIeATngDvJIHeSAR3kAg1IBRngGvVBYFVtmbQXIAud2p3QSYsLs/IwNSogFxcoSzfK3xl6MoqacnoUqxeV5Vqeo7TUsPVoUMRhX7xaaChWB0qI12ZCy8AfEL7tBOpOrGo80WfP0YVaU3CqrX1XJ87HkWExZ7kYnlGaIwNM2aIxmVLFDILIiCRAEAQBAEAQBAEACAXEkqy6ySrMyS6KMzLNEZs3aDHu6qg2zU/grrUPwQxUTdN2K07KrFvn66fc16ZnPOodGrQYUQ5FlLgDmdDEXuiWtmaoMkguDIBIaSCwaAWzQBmgEFoBXNIBGaCSpaCC2GQs6qouSdBz0vIexK3MWJ0JBGUjS0Ilk4NyFrWOjIqEcyaisP/mZ6sNu/A8OMtaK77/S33NZ56GedGF5RmiMDTNmiMZlSxQyCxEEiAIAgCAIAgCAIAgFhBBdZYqzMkujNmZZdGbN/Zr2dLjMMwBXmp0I9ouJrDfUwqp2djNtlqNLEPRoDMlJu7zne5XQn2kE+2ebFOKeSCtY9uCc501Opu9ffkbeN2gtWgq5crU7Wt6pFx8Z4oKzZ7pO6RyhLlSbwCQYBYGAWvAF4BBMAoTAF5BJF4IM+AqhKiO1yFJNhv3G0iWxMdyu1NoB6hfIADvEtTeV6ifaNvH0qS0KD0ST3+Z3B3qyWUL/AKj/AOU6rUEk4cTiZ6kqklPhovX8HGaZM2RheZs0RgaZmiMZkF0VMgsRAEAQBAEAQBAEAQBALCCCyyUVZmQy6KMzKZojNm1g6pR1cb1ZWHmDcTSJlNXVjb2umHWtenncuq1GUi2Qv4spPEgFR7558ZKnmuj09Hqq4Wl4LvsXfFZqZTJYW35hpbXdb95z4VYuVkzqTozUbtGlNzAXkAXgFgZJJN4AzQCCYBW8gC8AXkEGXDVSrBgoYi+hNpWpJRjdl6cXJ2RTGVkYkujLfflKkj4CKM4N66irTnFcjd2q1JadCnRJenkNXN/PUC5h7MgHmDOxOUWll2ODTU88nPe9vkchpiz0IwOZmzRGFpQ0RQyCxSQWEAQBAEAQBAEAQBAEAkQQWEkhmVTLIo0ZkM0RmzPSl0Zs6eNqUgqZVZ8TW8TIozEakCwHMDNbrPLj5RyZUtXuezoyM893stF3mwmxsb3bVDhXSmFYszPTDBQpuct7zjUpQVVdrifQ1qVXqZNx4c0ci86jOMLyAReCSQ0AkGSBeARmkAi8gC8AkGSDc2dga9diuHp96yrdhmVbLffqedp5sVKKh2nxPXgqcpzeVcCK9NqDhcZQqUgdNR4T5MNJnhZQU073XE1xlOooNNWZTaaorZKX8JR92b3LIxLhvbmvbhunfdkrR2Pl4uTd5b8TnsZmzVGBzM2aoxGULooZBZFYJEAQBAEAQBAEAQBAEAQCwgguplirNilLxMpHp+zvZbEYuzKBSpcaz3sRxyje3y6ytTEQpb78jShg6tf4VpzPZbD2bg8NiTSoD0nElAcRiG1FNEAAAtogNhpqTbebTkYivKqnK1kfRYPCQw0lDNeXoW2v2npGo2Eo06mIZ1eme6F7XUgnyF5hTwlSyqPRG9XHUruje7fI+W5p1nucFFC8qSM8AZ4AzwBni4GeAM8AZ4BKvAPQdmdqvhe+rJQfECyK7La1MEk3bzt8JhiKDr5YJ66+Z68JiVh802rrTyPfNjsPjcI7d0uITIRWokHOEt4ioGuYb9NdNNZ4lTnQqZWrM6nW0sTSzJtx7jzO1OxiVKS1tnP31IKLUWYFwAPwt+LyOvnOrh8amslRWaOHi+i2n1lJ3T96HhcVSZGKsCjKbMrAhlPIg7jPazlpNaM1GMyZoihMguihkEkQSIAgCAIAgCAIAgCAIBkpoDxtJRVuxs08Mp/FNVCL4mbm+RtUsDTO95rGlDizKVaXI3aVChTs5zViCCEVlW9vNWB8padKKj2XczjUm5aq3vxR127bVQrJ3VcKRawrILC1rDJSFpz3haf7oN+bOosfiErRqRXhH+TmDtJTUFVwQW4sahqYgVG14sBrN3UjlUerVl3HiVKrnc+vd3vt+TLs3telBaop0FpF13Z8Scx4AneOMwrZKlnKO3ierDutRvkqb90f5PNNjAdd3TXSZtmxX0gc5FwR6QOcAn0gc4BHpA5wCfSBzi4HpA5wCPSBzgD0gc4BIxA5wDsbA7TthTUyX8aWPgJuRe3EaamVlCM/iV/n9jSFadO+V2v4fe5Wh2hqKxdaCEtmzDLXCknoHtbWerrG7JwTtzV/U8bhZtqo1fezt6G/gO1+IosxoUFpBt6L3gTd+UsQJSpBVZZpU9e7Q0oV6mHjkhV070mVxm1DjCrYlAjKuUOGOa3I+HUeZnpw1BRVtl4tnmxeInUea934JGhUwNLg83lRp8zzxqz4o1amFQbmvMXTjzNY1JcjWqUwOMzaRopNmEyhoRAEAQBAEAQBAEAQBAF4BIYwRYsKp5ybsZUWFducZmRlRIxLc5OZjIh6S3ORmYyog1jIepZaDvegkWJuO96CLDMywrdBFkMzJ7/oJOhF2T6T0k6EXY9J6RoLsg4joJGhN2R3/QSLIXZHfdBFiczI73oIsMzI7yLC5YVzJuyth6Q3OTmZGVEGu3OMzGVFTVPOLsnKipcyLiyIvBIgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgEQSf//Z" alt="Carto the Hero" />

  <h2>Chapter 9: Bullet Points of Wisdom</h2>
  <p>They gathered their lessons from this creative journey into a bullet list:</p>
  <ul>
    <li>Be bold in your choices</li>
    <li>Use subtlety when necessary</li>
    <li>Balance your creativity with structure</li>
    <li>Remember, creativity comes from the heart</li>
  </ul>

  <h2>Chapter 10: Ordering the Steps</h2>
  <p>Finally, they decided to list the steps in order to ensure they didn’t miss anything:</p>
  <ol>
    <li>Choose a theme</li>
    <li>Write your first draft</li>
    <li>Edit and refine your ideas</li>
    <li>Share with the world!</li>
  </ol>

  <p>The adventure doesn’t end here. Carto and Toon will continue to create, innovate, and inspire!</p>`;
  const [htmlContent, setHTMLContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Add new state variables for the form fields
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnailType, setThumbnailType] = useState<"url" | "file">("url");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const handlePublish = async () => {
    if (!htmlContent.trim()) {
      toast({
        title: "Empty content",
        description: "Please write something before publishing.",
        variant: "destructive",
      });
      return;
    }

    const {
      title,
      excerpt,
      sanitizedHTML: html,
      tableOfContents,
    } = parseBlogContent(htmlContent);

    if (!title || !excerpt) {
      toast({
        title: "Error",
        description: "Title and Excerpt is required. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (!tags.length) {
      toast({
        title: "Error",
        description: "Please add at least one tag.",
        variant: "destructive",
      });
      return;
    }

    if (thumbnailType === "url" && !thumbnailUrl) {
      toast({
        title: "Error",
        description: "Please provide a thumbnail URL.",
        variant: "destructive",
      });
      return;
    }

    if (thumbnailType === "file" && !thumbnailFile) {
      toast({
        title: "Error",
        description: "Please upload a thumbnail image.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("excerpt", excerpt);
      formData.append("thumbnailType", thumbnailType);

      if (thumbnailType === "url") {
        formData.append("thumbnailUrl", thumbnailUrl);
      } else if (thumbnailFile) {
        formData.append("thumbnailFile", thumbnailFile);
      }
      console.log("table of contents", tableOfContents);
      formData.append("isFeatured", isFeatured.toString());
      formData.append("tags", tags.join(","));
      formData.append("tableOfContents", JSON.stringify(tableOfContents));
      formData.append("html", html);

      const res = await createBlog(formData);
      if (res.success) {
        toast({
          title: "Success!",
          description: `Your post has been ${
            isFeatured ? "featured and " : ""
          }published.`,
        });
      }
      console.log(htmlContent, { isFeatured });
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const CustomParagraph = Node.create({
    name: "paragraph",
    group: "block",
    content: "inline*",

    parseHTML() {
      return [{ tag: "p" }];
    },

    renderHTML({ HTMLAttributes }) {
      return ["p", HTMLAttributes, 0];
    },

    addAttributes() {
      return {
        class: {
          default: null,
          parseHTML: (element) => element.getAttribute("class") || null,
          renderHTML: (attributes) => {
            return attributes.class ? { class: attributes.class } : {};
          },
        },
      };
    },

    addKeyboardShortcuts() {
      return {
        Enter: ({ editor }) => {
          if (editor.isActive("paragraph", { class: "excerpt" })) {
            editor
              .chain()
              .focus()
              .splitBlock()
              .setNode("paragraph", { class: null })
              .run();
            return true;
          }
          return false;
        },
      };
    },
  });

  const editor = useEditor({
    extensions: [
      CustomParagraph,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        bold: {
          HTMLAttributes: {
            class: "font-bold",
          },
        },
        italic: {
          HTMLAttributes: {
            class: "italic",
          },
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        blockquote: {
          HTMLAttributes: {
            class:
              "italic text-base text-white bg-secondary border-l-4 border-primary p-4 my-4 rounded-md relative",
          },
        },
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: "my-4",
        },
      }),
      Typography,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "typescript",
        HTMLAttributes: {
          class: "bg-secondary p-4 rounded-md my-4",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: (attrs: any) => ({
          class: attrs.level === 1 ? "editor-title" : "",
        }),
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "text-primary",
        },
      }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: "text-black",
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "editor-paragraph",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your thoughts here… ✍️✨",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(
          "focus:outline-none",
          "[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-8",
          "[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:mb-5 [&_h2]:mt-7",
          "[&_h3]:text-2xl [&_h3]:font-medium [&_h3]:mb-4 [&_h3]:mt-6",
          "[&_h4]:text-xl [&_h4]:font-normal [&_h4]:mb-3 [&_h4]:mt-5",
          "[&_h5]:text-lg [&_h5]:font-light [&_h5]:mb-2 [&_h5]:mt-4",
          "[&_h6]:text-base [&_h6]:font-thin [&_h6]:mb-1 [&_h6]:mt-3",
          "[&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4"
        ),
      },
    },
    autofocus: true,
    content: initialContent,
    editable: true,
    onUpdate: ({ editor }) => {
      setHTMLContent(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="fixed top-4 bg-primary/30 backdrop-blur-md z-[10000] -pt-2 rounded-md">
        <ToolBar editor={editor!} />
      </div>
      <EditorContent
        className="w-[700px] bg-background/25 min-h-screen my-4 rounded-md mt-20 pb-24"
        editor={editor}
      />
      <div className="fixed bottom-8 right-8">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="shadow-lg hover:shadow-primary/25 transition-all duration-300 gap-2"
            >
              <Send className="h-5 w-5" />
              Publish
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Publish Post</DialogTitle>
              <DialogDescription>
                Complete the details below to publish your post.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* Tags Input */}
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-muted-foreground hover:text-destructive"
                        type="button"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Type a tag and press Enter"
                />
              </div>

              {/* Thumbnail Input */}
              <div className="grid gap-2">
                <Label>Thumbnail</Label>
                <Tabs
                  defaultValue="url"
                  onValueChange={(value) =>
                    setThumbnailType(value as "url" | "file")
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="url">URL</TabsTrigger>
                    <TabsTrigger value="file">Upload</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url" className="mt-2">
                    <Input
                      placeholder="Enter image URL"
                      value={thumbnailUrl}
                      onChange={(e) => setThumbnailUrl(e.target.value)}
                    />
                  </TabsContent>
                  <TabsContent value="file" className="mt-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {thumbnailFile && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Selected: {thumbnailFile.name}
                      </p>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={isFeatured}
                  onCheckedChange={(checked) =>
                    setIsFeatured(checked as boolean)
                  }
                />
                <Label htmlFor="featured">
                  Feature this post on your profile
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={handlePublish}
                disabled={isPublishing}
                className="w-full"
              >
                {isPublishing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Publish Post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
