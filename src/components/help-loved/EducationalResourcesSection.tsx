
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const educationalResources = [
  {
    title: "Understanding Substance Use Disorder",
    description: "Learn about addiction as a disease, signs and symptoms, and how it affects the brain and behavior."
  },
  {
    title: "Setting Healthy Boundaries",
    description: "Discover how to support your loved one while protecting your own mental health and wellbeing."
  },
  {
    title: "Effective Communication",
    description: "Learn how to have difficult conversations about substance use without judgment or confrontation."
  },
  {
    title: "Stages of Change",
    description: "Understand the recovery process and how to support your loved one through each stage."
  },
  {
    title: "Self-Care for Families",
    description: "Remember that you can't pour from an empty cup. Learn strategies for maintaining your own health."
  },
  {
    title: "When to Seek Professional Help",
    description: "Recognize when it's time to involve professionals and what treatment options are available."
  }
];

export const EducationalResourcesSection = () => {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
          Educational Resources
        </h2>
        <p className="text-lg text-gray-600">
          Understanding addiction and learning how to help
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {educationalResources.map((resource, index) => (
          <Card key={index} className="border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="card-content flex-grow">
                <h4 className="font-semibold text-gray-800 mb-3">{resource.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{resource.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
