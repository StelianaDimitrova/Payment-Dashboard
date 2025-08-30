import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import "./RequestPaymentModal.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: string, email: string, amount: number) => void;
}

export default function RequestPaymentModal({
  isOpen,
  onClose,
  onSubmit,
}: Props) {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setEmail] = useState<string>("");
  const [amount, setAmount] = useState<number | "">(0);

  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) dialog.current?.showModal();
    else dialog.current?.close();
  }, [isOpen]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(userName, userEmail, Number(amount));
    setUserName("");
    setEmail("");
    setAmount(0);
    onClose();
  }

  return createPortal(
    <dialog ref={dialog} className="dialog-container">
      <form onSubmit={(e) => handleSubmit(e)} className="payment-form">
        <h2 className="form-header">Request Payment</h2>

        <div className="user-info">
          <p id="info-paragraph">User information:</p>
          <div>
            <input
              id="user-name"
              required
              name="user"
              placeholder="User"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              id="user-email"
              required
              name="email"
              placeholder="Email"
              type="email"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="user-info">
          <p id="info-paragraph">Amount to be paid:</p>
          <input
            id="user-amount"
            required
            name="amount"
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>
        <div className="btn-box">
          <button type="submit">Request</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </dialog>,
    document.getElementById("modal")!
  );
}
