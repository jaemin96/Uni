import { PageHeader, PreviewBlock } from "@/components/PreviewBlock";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CardPage() {
  return (
    <div>
      <PageHeader
        title="Card"
        description="rounded-xl border bg-card shadow — anatomy: Header + Content + Footer."
      />
      <div className="space-y-6">
        <PreviewBlock title="Full anatomy" className="items-start">
          <Card className="w-80">
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-7">
                Card content. This is the main body area. Spacing is p-6 with pt-0 for content.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Save</Button>
              <Button size="sm" variant="outline">Cancel</Button>
            </CardFooter>
          </Card>
        </PreviewBlock>

        <PreviewBlock title="Header only" className="items-start">
          <Card className="w-72">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Project name</CardTitle>
                <Badge variant="secondary">Active</Badge>
              </div>
              <CardDescription>Last updated 2 hours ago</CardDescription>
            </CardHeader>
          </Card>
        </PreviewBlock>

        <PreviewBlock title="Content only" className="items-start">
          <Card className="w-72">
            <CardContent className="pt-6">
              <p className="text-3xl font-extrabold">4,231</p>
              <p className="text-xs text-muted-foreground mt-1">Total users</p>
            </CardContent>
          </Card>
          <Card className="w-72">
            <CardContent className="pt-6">
              <p className="text-3xl font-extrabold">+12%</p>
              <p className="text-xs text-muted-foreground mt-1">This week</p>
            </CardContent>
          </Card>
        </PreviewBlock>
      </div>
    </div>
  );
}
