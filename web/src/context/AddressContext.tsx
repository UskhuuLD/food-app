import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "food-app.delivery";

export type DeliveryInfo = {
  address: string;
  phoneNumber: string;
};

const EMPTY: DeliveryInfo = { address: "", phoneNumber: "" };

type AddressContextValue = {
  delivery: DeliveryInfo;
  setDelivery: (info: DeliveryInfo) => void;
};

const AddressContext = createContext<AddressContextValue | null>(null);

function loadInitial(): DeliveryInfo {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function AddressProvider({ children }: { children: ReactNode }) {
  const [delivery, setDeliveryState] = useState<DeliveryInfo>(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(delivery));
    } catch {
      // hadgalj chadaagui ch session-diihee ashiglaad davjina
    }
  }, [delivery]);

  return (
    <AddressContext.Provider
      value={{ delivery, setDelivery: setDeliveryState }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useDelivery() {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error("useDelivery must be used within AddressProvider");
  return ctx;
}
