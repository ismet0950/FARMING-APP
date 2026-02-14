import { Button } from "@/components/ui/button";
import DebugTailwind from "@/components/DebugTailwind";

export default function Home() {
  return (
    <>
      <div data-debug="tailwind-check" className="bg-blue-700 p-4">
        <Button>Click Me</Button>
      </div>
      <DebugTailwind />
    </>
  );
}