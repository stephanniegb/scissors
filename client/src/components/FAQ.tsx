import { useState } from "react";
import FAQData from "../data/FAQ.json";
interface FAQItem {
  question: string;
  answer: string;
}

function FAQ() {
  const faqData: FAQItem[] = FAQData;
  const [active, setActive] = useState<number | null>(0);

  const handleToggle = (activeId: number | null) => {
    if (active === activeId) {
      setActive(null);
    } else {
      setActive(activeId);
    }
  };
  return (
    <section id="faq-section">
      <h2>FAQs</h2>
      <section id="questions-section">
        {faqData &&
          faqData.map((faq, index) => {
            return (
              <ul key={index} onClick={() => handleToggle(index)}>
                <div className="qest-div">
                  <span>{faq.question}</span>
                  <button>
                    {active === index ? (
                      <img src="/images/minus.svg" alt="" />
                    ) : (
                      <img src="/images/plus.svg" alt="" />
                    )}
                  </button>
                </div>
                <li className={active === index ? "active" : ""}>
                  {faq.answer}
                </li>
              </ul>
            );
          })}
      </section>
    </section>
  );
}

export default FAQ;
