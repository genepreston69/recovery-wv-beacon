
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

interface PrintButtonProps {
  className?: string;
}

export const PrintButton: React.FC<PrintButtonProps> = ({ className }) => {
  const handlePrint = () => {
    // Ensure charts are ready before printing
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <Button
      onClick={handlePrint}
      variant="outline"
      size="sm"
      className={className}
    >
      <Printer className="w-4 h-4 mr-2" />
      Print Report
    </Button>
  );
};
