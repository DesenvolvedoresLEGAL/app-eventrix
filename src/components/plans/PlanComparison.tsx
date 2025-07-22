
import React from 'react';
import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { comparisonFeatures, mainPlans } from '@/data/plansData';

interface PlanComparisonProps {
  billingCycle: 'annual' | 'monthly';
  formatPrice: (price: number) => string;
}

const PlanComparison: React.FC<PlanComparisonProps> = ({ billingCycle, formatPrice }) => {
  const renderFeatureValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-4 h-4 text-primary mx-auto" />
      ) : (
        <X className="w-4 h-4 text-muted-foreground mx-auto" />
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  const planNames = ['start', 'scale', 'boom', 'enterprise'] as const;

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <Card className="tech-card">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl lg:text-3xl font-bold mb-2">
              Compare todos os planos
            </CardTitle>
            <p className="text-muted-foreground">
              Veja lado a lado todos os recursos e benefícios
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/5 font-semibold">Recursos</TableHead>
                  {mainPlans.map((plan) => (
                    <TableHead key={plan.name} className="text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{plan.name}</span>
                          {plan.popular && (
                            <Badge className="bg-secondary text-white text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <div className="text-lg font-bold text-primary">
                          {plan.price.annual === 0 ? (
                            'Sob consulta'
                          ) : (
                            formatPrice(plan.price[billingCycle])
                          )}
                        </div>
                        {plan.price.annual > 0 && (
                          <div className="text-xs text-muted-foreground">
                            /{billingCycle === 'annual' ? 'ano' : 'mês'}
                          </div>
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonFeatures.map((category) => (
                  <React.Fragment key={category.category}>
                    <TableRow className="bg-muted/30">
                      <TableCell colSpan={5} className="font-bold text-foreground py-3">
                        {category.category}
                      </TableCell>
                    </TableRow>
                    {category.features.map((feature) => (
                      <TableRow key={feature.name}>
                        <TableCell className="font-medium pl-6">
                          {feature.name}
                        </TableCell>
                        {planNames.map((planKey) => (
                          <TableCell key={planKey} className="text-center">
                            {renderFeatureValue(feature[planKey])}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Accordion View */}
      <div className="block lg:hidden">
        <Card className="tech-card">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl md:text-2xl font-bold mb-2">
              Compare todos os planos
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Toque para expandir e comparar recursos
            </p>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {mainPlans.map((plan) => (
                <AccordionItem key={plan.name} value={plan.name} className="tech-card border">
                  <AccordionTrigger className="px-4 py-3">
                    <div className="flex items-center justify-between w-full mr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{plan.name}</span>
                        {plan.popular && (
                          <Badge className="bg-secondary text-white text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-primary">
                          {plan.price.annual === 0 ? (
                            'Sob consulta'
                          ) : (
                            formatPrice(plan.price[billingCycle])
                          )}
                        </div>
                        {plan.price.annual > 0 && (
                          <div className="text-xs text-muted-foreground">
                            /{billingCycle === 'annual' ? 'ano' : 'mês'}
                          </div>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      {comparisonFeatures.map((category) => (
                        <div key={category.category}>
                          <h4 className="font-semibold text-sm mb-2 text-primary">
                            {category.category}
                          </h4>
                          <div className="space-y-2 pl-2">
                            {category.features.map((feature) => {
                              const planKey = plan.name.toLowerCase() as keyof typeof feature;
                              return (
                                <div key={feature.name} className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    {feature.name}
                                  </span>
                                  <div>
                                    {renderFeatureValue(feature[planKey])}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlanComparison;
