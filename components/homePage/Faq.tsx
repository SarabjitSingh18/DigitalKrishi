import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-green-700 dark:text-green-400 mb-12">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="q1" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-medium">
            🌱 How can I ask a question in Malayalam?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 dark:text-gray-300">
            You can type your query directly in Malayalam or use the voice input option
            to ask your question. Our system will process it and give you tailored advice.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q2" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-medium">
            🐛 Can I upload a picture of a diseased crop?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 dark:text-gray-300">
            Yes! Farmers can upload images of crops, and the AI will analyze them to suggest
            possible issues and remedies.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q3" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-medium">
            🌦️ Will I get weather updates for my area?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 dark:text-gray-300">
            Absolutely. Our system uses your location to provide real-time, localized
            weather updates and crop recommendations.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q4" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-medium">
            👨‍🌾 What if the AI cannot answer my question?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 dark:text-gray-300">
            If the AI is unsure, your query will be escalated to a local agricultural officer
            who can provide more accurate guidance.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQSection;
