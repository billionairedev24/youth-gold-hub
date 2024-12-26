import { Card, CardHeader, CardContent } from "@/components/ui/card";

const BudgetPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Budget</h1>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Manage Budget</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Budget management interface will be implemented here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetPage;