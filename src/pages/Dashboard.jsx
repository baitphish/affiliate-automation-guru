import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = () => {
  const [affiliateLink, setAffiliateLink] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [submissionHistory, setSubmissionHistory] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [affiliatePrograms, setAffiliatePrograms] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulating API calls to fetch data
    const fetchData = async () => {
      // Fetch submission history
      const mockHistory = [
        { id: 1, link: 'https://example.com/aff1', program: 'Amazon Associates', status: 'Approved', date: '2023-03-15' },
        { id: 2, link: 'https://example.com/aff2', program: 'ClickBank', status: 'Pending', date: '2023-03-16' },
        { id: 3, link: 'https://example.com/aff3', program: 'ShareASale', status: 'Rejected', date: '2023-03-17' },
        { id: 4, link: 'https://example.com/aff4', program: 'CJ Affiliate', status: 'Approved', date: '2023-03-18' },
        { id: 5, link: 'https://example.com/aff5', program: 'Rakuten Marketing', status: 'Approved', date: '2023-03-19' },
      ];
      setSubmissionHistory(mockHistory);

      // Fetch performance data
      const mockData = [
        { date: '2023-03-15', clicks: 100, conversions: 5, earnings: 250 },
        { date: '2023-03-16', clicks: 120, conversions: 6, earnings: 300 },
        { date: '2023-03-17', clicks: 90, conversions: 4, earnings: 200 },
        { date: '2023-03-18', clicks: 150, conversions: 8, earnings: 400 },
        { date: '2023-03-19', clicks: 130, conversions: 7, earnings: 350 },
      ];
      setPerformanceData(mockData);

      // Fetch affiliate programs
      const mockPrograms = [
        'Amazon Associates',
        'ClickBank',
        'ShareASale',
        'CJ Affiliate',
        'Rakuten Marketing',
      ];
      setAffiliatePrograms(mockPrograms);
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProgram) {
      toast({
        title: "Submission Failed",
        description: "Please select an affiliate program.",
        variant: "destructive",
      });
      return;
    }
    // Simulating link submission
    const newSubmission = {
      id: submissionHistory.length + 1,
      link: affiliateLink,
      program: selectedProgram,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
    };
    setSubmissionHistory([newSubmission, ...submissionHistory]);
    toast({
      title: "Affiliate Link Submitted",
      description: `Your link for ${selectedProgram} has been submitted for review.`,
    });
    setAffiliateLink('');
    setSelectedProgram('');
  };

  const getTotalStats = () => {
    return performanceData.reduce((acc, day) => {
      acc.clicks += day.clicks;
      acc.conversions += day.conversions;
      acc.earnings += day.earnings;
      return acc;
    }, { clicks: 0, conversions: 0, earnings: 0 });
  };

  const totalStats = getTotalStats();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Affiliate Submit Tool Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Submit Affiliate Link</CardTitle>
            <CardDescription>Enter your affiliate link and select a program</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Select onValueChange={setSelectedProgram} value={selectedProgram}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Affiliate Program" />
                </SelectTrigger>
                <SelectContent>
                  {affiliatePrograms.map((program) => (
                    <SelectItem key={program} value={program}>{program}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <CardTitle>Overall Statistics</CardTitle>
            <CardDescription>Your total affiliate performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Total Clicks</h3>
                <p className="text-2xl">{totalStats.clicks.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Total Conversions</h3>
                <p className="text-2xl">{totalStats.conversions.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Conversion Rate</h3>
                <p className="text-2xl">{((totalStats.conversions / totalStats.clicks) * 100).toFixed(2)}%</p>
              </div>
              <div>
                <h3 className="font-semibold">Total Earnings</h3>
                <p className="text-2xl">${totalStats.earnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Performance Analytics</CardTitle>
          <CardDescription>Detailed view of your affiliate performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chart">Performance Chart</TabsTrigger>
              <TabsTrigger value="table">Data Table</TabsTrigger>
            </TabsList>
            <TabsContent value="chart">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line yAxisId="left" type="monotone" dataKey="conversions" stroke="#82ca9d" />
                  <Line yAxisId="right" type="monotone" dataKey="earnings" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="table">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Conversions</TableHead>
                    <TableHead>Earnings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData.map((day, index) => (
                    <TableRow key={index}>
                      <TableCell>{day.date}</TableCell>
                      <TableCell>{day.clicks}</TableCell>
                      <TableCell>{day.conversions}</TableCell>
                      <TableCell>${day.earnings}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
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
                <TableHead>Program</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submission Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissionHistory.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.link}</TableCell>
                  <TableCell>{submission.program}</TableCell>
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
