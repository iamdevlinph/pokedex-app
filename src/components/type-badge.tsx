import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge';

type TypeBadge = {
  type: string;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
};

export const TypeBadge = ({ type, selected = false, onClick }: TypeBadge) => {
  const baseBadgeStyles = 'm-0.5 cursor-pointer';
  const inactiveStyles = 'bg-slate-500';

  return (
    <Badge
      className={cn(baseBadgeStyles, !selected && inactiveStyles)}
      onClick={onClick}
    >
      {type.toUpperCase()}
    </Badge>
  );
};
