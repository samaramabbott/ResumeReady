import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface JobBoard {
  id: string;
  name: string;
  description: string;
  website: string;
  category: string;
  isFree?: boolean;
}

interface JobBoardCardProps {
  board: JobBoard;
}

export function JobBoardCard({ board }: JobBoardCardProps) {
  return (
    <Card className="hover-elevate">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{board.name}</CardTitle>
          {board.isFree && <Badge variant="secondary" className="text-xs">Free</Badge>}
        </div>
        <CardDescription className="text-sm">{board.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="text-xs">{board.category}</Badge>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => window.open(board.website, "_blank")}
            data-testid={`button-visit-board-${board.id}`}
          >
            <ExternalLink className="h-4 w-4" />
            Visit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
