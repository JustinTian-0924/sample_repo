type Question = {
  question: string
  answer: string
}

export function FaqList({ items }: { items: readonly Question[] }) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details className="faq-item" key={item.question}>
          <summary>
            <span className="faq-number">{String(index + 1).padStart(2, '0')}</span>
            <span>{item.question}</span>
            <span className="faq-indicator" aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
