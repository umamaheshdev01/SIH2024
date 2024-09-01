import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {BentoGridDemo} from '@/components/ui/bentogrid'
import { ClassList } from "@/components/component/class-list";
import Todod from "./Todod";

export default function DashboardPage() {
  return (
    <ContentLayout title="To do">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>To do</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>

        {/* <BentoGridDemo></BentoGridDemo> */}

    
          <Todod></Todod>

      </PlaceholderContent>

    </ContentLayout>
  );
}
