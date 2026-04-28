import { PageHeader, PreviewBlock } from "@/components/PreviewBlock";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function TabsPage() {
  return (
    <div>
      <PageHeader
        title="Tabs"
        description="Radix Tabs primitive with List / Trigger / Content."
      />
      <div className="space-y-6">
        <PreviewBlock title="Basic">
          <Tabs defaultValue="account" className="w-96">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>Make changes to your account here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>Name</Label>
                    <Input defaultValue="Jaemin" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Username</Label>
                    <Input defaultValue="@jaemin96" />
                  </div>
                  <Button size="sm">Save changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>Current password</Label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>New password</Label>
                    <Input type="password" />
                  </div>
                  <Button size="sm">Save password</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </PreviewBlock>

        <PreviewBlock title="Three tabs">
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList>
              <TabsTrigger value="tab1">General</TabsTrigger>
              <TabsTrigger value="tab2">Team</TabsTrigger>
              <TabsTrigger value="tab3">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-4">
              <p className="text-sm text-muted-foreground">General settings panel content.</p>
            </TabsContent>
            <TabsContent value="tab2" className="mt-4">
              <p className="text-sm text-muted-foreground">Team management panel content.</p>
            </TabsContent>
            <TabsContent value="tab3" className="mt-4">
              <p className="text-sm text-muted-foreground">Billing and invoices panel content.</p>
            </TabsContent>
          </Tabs>
        </PreviewBlock>
      </div>
    </div>
  );
}
