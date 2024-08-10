import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

  // Mock data for submission history
  const submissionHistory = [
    { id: 1, link: 'https://example.com/aff1', status: 'Approved', date: '2023-03-15' },
    { id: 2, link: 'https://example.com/aff2', status: 'Pending', date: '2023-03-16' },
    { id: 3, link: 'https://example.com/aff3', status: 'Rejected', date: '2023-03-17' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Affiliate Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>Your affiliate performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Total Clicks</h3>
                <p className="text-2xl">1,234</p>
              </div>
              <div>
                <h3 className="font-semibold">Conversions</h3>
                <p className="text-2xl">56</p>
              </div>
              <div>
                <h3 className="font-semibold">Conversion Rate</h3>
                <p className="text-2xl">4.54%</p>
              </div>
              <div>
                <h3 className="font-semibold">Earnings</h3>
                <p className="text-2xl">$789.00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Submission History</CardTitle>
          <CardDescription>Your recent affiliate link submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Link</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submission Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissionHistory.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.link}</TableCell>
                  <TableCell>{submission.status}</TableCell>
                  <TableCell>{submission.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
