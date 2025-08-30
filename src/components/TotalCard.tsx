import "./TotalCard.css";

type TotalCardProps = {
  title: string;
  sum: number;
};

export default function TotalCard({ title, sum }: TotalCardProps) {
  const now = new Date();

  return (
    <div className="card-container">
      <h1 className="card-title">{title}</h1>
      <p className="card-price">
        {sum.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </p>
      <p className="card-percentage up">
         <span className="card-span">{now.toLocaleDateString()}</span>
      </p>
    </div>
  );
}
