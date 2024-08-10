import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [affiliateLink, setAffiliateLink] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement affiliate link submission logic
    toast({
      title: "Affiliate Link Submitted",
      description: `Your link: ${affiliateLink} has been submitted for review.`,
    });
    setAffiliateLink('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Affiliate Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Submit Affiliate Link</CardTitle>
          <CardDescription>Enter your affiliate link for review</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="url"
              placeholder="https://example.com/affiliate-link"
              value={affiliateLink}
              onChange={(e) => setAffiliateLink(e.target.value)}
              required
            />
            <Button type="submit">Submit Link</Button>
          </form>
        </CardContent>
      </Card>
      {/* TODO: Add more dashboard components (e.g., stats, link history) */}
    </div>
  );
};

export default Dashboard;
