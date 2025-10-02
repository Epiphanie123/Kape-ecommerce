// src/components/Element.tsx
import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const shippingInfo: FAQItem[] = [
  {
    question: "What are the delivery charges?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium nisi feugiat nisi gravida, eget rutrum ligula placerat. Aenean id elit dolor. Suspendisse malesuada varius odio. Praesent efficitur, odio at dictum fringilla, leo dolor ornare nulla, quis condimentum enim arcu id magna.",
  },
  {
    question: "What is the estimated delivery time?",
    answer:
      "Delivery usually takes between 3–7 business days depending on your location.",
  },
  {
    question: "What to track order work?",
    answer:
      "Once your order is shipped, you will receive an email with the tracking details.",
  },
  {
    question: "Will my parcel be charged customs and import charges?",
    answer:
      "Customs and import duties may be applied depending on your country’s regulations.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide with a few exceptions.",
  },
];

const returnsInfo: FAQItem[] = [
  {
    question: "How do I return something to you?",
    answer:
      "You can return your product by following the return instructions provided in your package.",
  },
  {
    question: "What is your International Returns Policy?",
    answer:
      "International customers are responsible for return shipping costs unless the product is faulty.",
  },
  {
    question: "My refund is incorrect, what should I do?",
    answer:
      "Please contact our customer support if your refund amount does not match the expected value.",
  },
  {
    question: "Will my parcel be charged customs and import charges?",
    answer:
      "Yes, international returns may be subject to customs and import duties.",
  },
  {
    question: "Do you refund delivery charges if I return something?",
    answer:
      "Delivery charges are refundable only if the product was faulty or incorrect.",
  },
];

const FAQSection: React.FC<{ title: string; items: FAQItem[] }> = ({
  title,
  items,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full md:w-1/2 px-4">
      <h2 className="text-lg font-semibold border-b pb-2 mb-4">{title}</h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="border rounded-md">
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-4 py-2 text-left font-medium hover:bg-gray-50"
            >
              {item.question}
              <span>{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-3 text-sm text-gray-600">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Element: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <FAQSection title="SHIPPING INFORMATION" items={shippingInfo} />
        <FAQSection title="RETURNS & REFUNDS" items={returnsInfo} />
      </div>
    </div>
  );
};

export default Element;
