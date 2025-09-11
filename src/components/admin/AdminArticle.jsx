import { PenSquare, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const articles = [
  {
    title:
      "Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do",
    category: "Cat",
    status: "Published",
  },
  {
    title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
    category: "Cat",
    status: "Published",
  },
  {
    title: "Finding Motivation: How to Stay Inspired Through Life's Challenges",
    category: "General",
    status: "Published",
  },
  {
    title:
      "The Science of the Cat's Purr: How It Benefits Cats and Humans Alike",
    category: "Cat",
    status: "Published",
  },
  {
    title: "Top 10 Health Tips to Keep Your Cat Happy and Healthy",
    category: "Cat",
    status: "Published",
  },
  {
    title: "Unlocking Creativity: Simple Habits to Spark Inspiration Daily",
    category: "Inspiration",
    status: "Published",
  },
];

const categories = [
  { name: "Cat" },
  { name: "General" },
  { name: "Inspiration" },
];

const status = [
"Publish" ,
 "Draft"
];
function AdminArticle({setManage}) {

  const handleClick = () => {
    setManage("create");
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-10 mb-6 border-b">
        <h2 className="text-2xl font-semibold">Article management</h2>
        <Button 
        onClick={handleClick}
        className="px-8 py-2 rounded-full cursor-pointer">
          + Create article
        </Button>
      </div>
      <div className="flex px-10 justify-between">
        <Input placeholder="Search" className="w-75" />
        <div className="flex gap-5">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {status.map((item, index) => (
                <SelectItem key={index} value="light">
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category, index) => (
                <SelectItem key={index} value="light">
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Article title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {article.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={()=>setManage("edit")}>
                    <PenSquare className="h-4 w-4 hover:text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick="delete">
                    <Trash2 className="h-4 w-4 hover:text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
export default AdminArticle;
