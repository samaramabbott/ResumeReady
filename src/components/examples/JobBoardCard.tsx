import { JobBoardCard, type JobBoard } from "../JobBoardCard";

const mockBoard: JobBoard = {
  id: "seek",
  name: "SEEK",
  description: "Australia's largest employment marketplace with thousands of jobs across all industries.",
  website: "https://www.seek.com.au",
  category: "General",
  isFree: true,
};

export default function JobBoardCardExample() {
  return (
    <div className="w-80">
      <JobBoardCard board={mockBoard} />
    </div>
  );
}
