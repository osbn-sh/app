import { Button } from "@/app/base/button";
import { Card } from "@/components/ui/card";

interface PendingCardProps {
  name: string;
  added: string;
  hisTalent: string;
}

const PendingCard = ({ name, added, hisTalent }: PendingCardProps) => {
  return (
<div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-br from-slate-200/40 via-slate-100/20 to-transparent p-[1px] shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
  <Card className="rounded-2xl border-0 bg-background/90 backdrop-blur-sm">
    <div className="flex items-center justify-between p-5">

      <div className="space-y-2">
        <h2 className="text-lg font-bold">{name}</h2>

        <div className="flex gap-5 text-sm text-muted-foreground">
          <span>
            <strong>Added by:</strong> {added}
          </span>

          <span>
            <strong>Talent:</strong> {hisTalent}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="Approve" />
        <Button variant="Reject" />
      </div>

    </div>
  </Card>
</div>
       );
};

export default PendingCard;