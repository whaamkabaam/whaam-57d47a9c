import { Check, X, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureRow {
  name: string;
  basic: string | boolean;
  plus: string | boolean;
  ultra: string | boolean;
}

const features: FeatureRow[] = [
  { name: 'Daily adjustments', basic: '5', plus: '25', ultra: '∞' },
  { name: 'Library slots', basic: '5', plus: '20', ultra: '∞' },
  { name: 'Favorite slots', basic: '1', plus: '5', ultra: '∞' },
  { name: 'Feedback control', basic: 'Buttons', plus: 'Slider', ultra: 'Slider' },
  { name: 'Feedback precision', basic: '±0.5', plus: '±0.1', ultra: '±0.1' },
  { name: 'Upload .ccurve', basic: false, plus: true, ultra: true },
  { name: 'Restore any version', basic: false, plus: true, ultra: true },
  { name: 'Form settings', basic: false, plus: false, ultra: true },
];

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check className="w-4 h-4 text-secondary mx-auto" />;
  }
  if (value === false) {
    return <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />;
  }
  return <span className="text-sm text-foreground">{value}</span>;
}

export function FeatureComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px]">
        <thead>
          <tr className="border-b border-border">
            <th className="py-4 px-3 text-left text-sm font-semibold text-foreground">
              Feature
            </th>
            <th className="py-4 px-3 text-center text-sm font-semibold text-foreground">
              Basic
            </th>
            <th className="py-4 px-3 text-center text-sm font-semibold text-secondary">
              Plus
            </th>
            <th className="py-4 px-3 text-center text-sm font-semibold text-primary">
              Ultra
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr 
              key={feature.name}
              className={cn(
                "border-b border-border/50",
                index % 2 === 0 && "bg-muted/20"
              )}
            >
              <td className="py-3 px-3 text-sm text-muted-foreground">
                {feature.name}
              </td>
              <td className="py-3 px-3 text-center">
                <CellValue value={feature.basic} />
              </td>
              <td className="py-3 px-3 text-center">
                <CellValue value={feature.plus} />
              </td>
              <td className="py-3 px-3 text-center">
                <CellValue value={feature.ultra} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
