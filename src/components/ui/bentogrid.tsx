import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from "next/image";

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

interface SkeletonProps {
  img?: string; // Optional prop of type string
}

const Skeleton: React.FC<SkeletonProps> = ({ img }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    {img ? (
      <Image
        src={img}
        width={400}
        height={200}
        alt="demo"
        priority
        className="w-full h-full rounded-xl"
        style={{ border: 'none' }}
      />
    ) : (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
    )}
  </div>
);

const items = [
  {
    title: "Assignments",
    description: "The Assignments tab lets you manage and submit your course work.",
    header: <Skeleton img="/assign2.jpg"/>,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Resources",
    description: "The Resources tab offers quick access to essential study materials and PYQ's",
    header: <Skeleton img ="/resources.jpeg" />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Progress",
    description: "The Progress tab tracks your academic achievements and ongoing performance.",
    header: <Skeleton img ="/progress.jpeg" />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Videos & Lectures",
    description:
      "The Videos and Lectures tab provides access to all course-related video content and recorded lectures.",
    header: <Skeleton img ="/vl.jpg" /> ,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Group Chat",
    description: "The Group Chat tab allows students to collaborate and communicate.",
    header: <Skeleton img ="/phone.jpeg" />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  
];
