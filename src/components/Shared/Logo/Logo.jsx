import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });

const Logo = () => {
  return (
    <div className={pacifico.className}>
      <p>boi-binimoy</p>
    </div>
  );
};

export default Logo;
