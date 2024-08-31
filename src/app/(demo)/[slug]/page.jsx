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

export default function DashboardPage({params}) {

  const id = params.slug
  return (
    <ContentLayout title="Class">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Class</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>

        {/* <BentoGridDemo></BentoGridDemo> */}
        <BentoGridDemo></BentoGridDemo>

      
        

      </PlaceholderContent>

    </ContentLayout>
  );
}
