import Modal, { DialogSize } from "dsl/components/Modal/Modal";
import { emojisplosion } from "emojisplosion";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useRef, useState } from "react";
import Button from "../../../dsl/components/Button/Button";
import Link from "../../../dsl/components/Link/Link";
import env from "../../environment";
import { css } from "../../helpers/css";
import cumulativeOffset from "../../helpers/cumulativeOffset";
import { useHomeContext } from "../../pages";
import BarkTankItem from "../BarkTankItem/BarkTankItem";
import HelperContent from "../HelperContent/HelperContent";
import Pixel, { PixelSize } from "../Pixel/Pixel";
import HomeFeature from "./HomeFeature";
import styles from "./HomeItems.module.css";

export const Doge = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div className={css("mx-6")}>
      <div className={css("relative", "z-10", "m-auto", "max-w-xl")}>
        <div
          ref={ref}
          className={css(
            "relative",
            "w-full",
            "h-full",
            "hover:cursor-pointer",
            "active:translate-x-1",
            "active:translate-y-1",
            "flex-1",
            "border-2",
            "border-solid",
            "border-black"
          )}
          onClick={() => {
            const explode = (
              xInitialVelocity: number,
              yInitialVelocity: number
            ) => {
              emojisplosion({
                process(e) {
                  e.className += " emojipop";
                  //@ts-ignore
                  e.style.zIndex = 0;
                },
                position: () => {
                  let x = Math.random() * innerWidth;
                  let y = Math.random() * innerHeight;
                  if (ref.current) {
                    const offset = cumulativeOffset(ref.current);
                    x = offset.left + ref.current!.clientWidth / 2;
                    y = offset.top + ref.current!.clientHeight / 2;
                  }
                  return { x, y };
                },
                emojis: ["✨", "🐕", "✨", "🐕"],
                physics: {
                  fontSize: {
                    min: 24,
                    max: 108,
                  },
                  gravity: 0.55,
                  initialVelocities: {
                    y: { max: yInitialVelocity, min: 0 },
                    x: { max: xInitialVelocity, min: 0 },
                    rotation: 15,
                  },
                },
              });
            };
            explode(60, -50);
            explode(-60, -50);
          }}
        >
          <Image
            alt={"doge"}
            src={"/images/kabosu.png"}
            layout={"responsive"}
            width={640}
            height={480}
            style={{ zIndex: 10 }}
          />
        </div>
        <div
          className={css("bg-black", "absolute", "w-full", "h-full")}
          style={{ top: 5, left: 5, zIndex: -1 }}
        />
      </div>
      <div className={css("mt-16", "px-16", "bg-pixels-yellow-100")}>
        <Link bold isExternal href={"https://knowyourmeme.com/memes/doge"}>
          Doge
        </Link>{" "}
        grew to{" "}
        <Link
          bold
          isExternal
          href={
            "https://knowyourmeme.com/editorials/meme-review/the-top-10-memes-of-the-decade"
          }
        >
          prominence
        </Link>{" "}
        in the early {"2010's"} when Atsuko Sato posted 8 photos to{" "}
        <Link bold href={"https://kabochan.blog.jp/"} isExternal>
          her blog
        </Link>{" "}
        of her adopted Shiba Inu, Kabosu.
      </div>
    </div>
  );
};

export const FramedImage: React.FC<PropsWithChildren<any>> = ({
  imagePath,
  description,
}: {
  imagePath: string;
  description: string;
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className={css("relative")}>
        <div
          className={css(
            "relative",
            "w-full",
            "m-auto",
            "flex-1",
            "cursor-pointer",
            "relative",
            "md:hover:right-2",
            "md:hover:bottom-2",
            "active:translate-x-2",
            "active:translate-y-2",
            "z-10",
            styles.overlapGrid
          )}
          onClick={() => setShowModal(true)}
        >
          <div
            className={css("relative")}
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              left: "50%",
              top: "-50%",
              transform: "translate(-50%, 80%)",
            }}
          >
            <Image
              alt={description}
              src={imagePath}
              layout={"responsive"}
              width={640}
              height={480}
            />
          </div>
          <Image
            alt={"frame"}
            src={"/images/frame.png"}
            layout={"responsive"}
            width={500}
            height={401}
          />
        </div>
        <div
          className={css("inline-block", "text-lg", "md:text-xl", "italic")}
          style={{ gridArea: "auto" }}
        >
          {description}
        </div>
      </div>
      <Modal
        size={DialogSize.lg}
        isOpen={showModal}
        title={"✨ " + description + " ✨"}
        onChange={(val) => setShowModal(val)}
      >
        <div
          className={css(
            "relative",
            "border-2",
            "border-solid",
            "border-black"
          )}
        >
          <Image
            src={imagePath}
            layout={"responsive"}
            width={640}
            height={480}
          />
        </div>
      </Modal>
    </>
  );
};

export const DogeNFT = () => {
  return (
    <div>
      <div
        className={css("grid", "grid-cols-3", "gap-6", "max-w-2xl", "m-auto")}
      >
        <FramedImage imagePath={"/images/sad.png"} description={"Sad"} />
        <FramedImage imagePath={"/images/cuddle.png"} description={"Cuddly"} />
        <FramedImage
          imagePath={"/images/yelling.png"}
          description={"Yelling"}
        />
        <FramedImage
          imagePath={"/images/curious.png"}
          description={"Curious"}
        />
        <FramedImage imagePath={"/images/angry.png"} description={"Angry"} />
        <FramedImage
          imagePath={"/images/shocked.png"}
          description={"Shocked"}
        />
        <div className={css("relative")} style={{ left: "50%" }}>
          <FramedImage imagePath={"/images/kabosu.png"} description={"Doge"} />
        </div>
        <div />
        <div className={css("relative")} style={{ right: "50%" }}>
          <FramedImage
            imagePath={"/images/feisty.png"}
            description={"Feisty"}
          />
        </div>
      </div>
      <div className={css("mt-6", "bg-pixels-yellow-100")}>
        In 2021, Ms. Satō minted the famous photos on Ethereum as NFTs. The most
        iconic image &quot;Doge&quot;, was purchased by{" "}
        <Link bold isExternal href={"https://pleasr.org/"}>
          PleasrDAO
        </Link>{" "}
        at{" "}
        <Link bold isExternal href={"https://very.auction/doge/doge"}>
          auction
        </Link>{" "}
        for 1696.9 ETH ($4.8 M at the time), making it the most valuable meme
        NFT.
      </div>
      <div className={css("mt-6")}>
        <HelperContent>
          Read{" "}
          <Link
            bold
            isExternal
            href={
              "https://medium.com/the-doge-times/what-is-the-doge-nft-dog-c9277236f072"
            }
          >
            this
          </Link>{" "}
          for more
        </HelperContent>
      </div>
    </div>
  );
};

export const Dog = () => {
  return (
    <div>
      <div
        className={css(
          "relative",
          "w-full",
          "lg:w-3/5",
          "lg:1/5",
          "m-auto",
          "flex-1",
          styles.overlapGrid
        )}
      >
        <div
          className={css("relative")}
          style={{
            maxWidth: "80%",
            maxHeight: "80%",
            left: "50%",
            top: "-50%",
            transform: "translate(-50%, 80%)",
          }}
        >
          <Image
            alt={"kabosu"}
            src={"/images/kabosu.png"}
            layout={"responsive"}
            width={640}
            height={480}
          />
        </div>
        <Image
          alt={"frame"}
          src={"/images/frame.png"}
          layout={"responsive"}
          width={500}
          height={401}
        />
      </div>
      <div className={css("mt-10", "bg-pixels-yellow-100")}>
        After the auction, PleasrDAO{" "}
        <Link
          bold
          isExternal
          href={
            "https://fractional.art/vaults/0xbaac2b4491727d78d2b78815144570b9f2fe8899"
          }
        >
          fractionalized
        </Link>{" "}
        The Doge NFT into a governance token, $DOG, allowing any and all to own
        a piece of the meme.
      </div>
      <HelperContent>
        Fractionalization? Learn more{" "}
        <Link
          bold
          isExternal
          href={
            "https://medium.com/fractional-art/what-is-fractional-dd4f86e6458a#:~:text=Fractional%20is%20a%20decentralized%20protocol%20where%20NFT%20owners%20can%20mint,the%20NFT%20that%20they%20own."
          }
        >
          here
        </Link>
      </HelperContent>
    </div>
  );
};

export const Pixels = () => {
  return (
    <div>
      <Pixel
        color={"#2e2e2c"}
        id={1078409}
        x={329}
        y={122}
        size={PixelSize.lg}
      />
      <div>
        <div
          className={css(
            "text-base",
            "mt-4",
            "bg-pixels-yellow-100",
            "inline-block"
          )}
        >
          (an actual pixel of The Doge NFT)
        </div>
      </div>
      <div className={css("mt-10", "bg-pixels-yellow-100")}>
        The total supply of $DOG is 16,969,696,969. The total amount of pixels
        in The Doge NFT is 307,200 (640 x 480 resolution). Therefore, a single
        pixel is equivalent to 55,240 $DOG. Holders can lock $DOG to mint
        &apos;Doge Pixel&apos; NFTs at the{" "}
        <Link bold isExternal href={"https://pixels.ownthedoge.com"}>
          Doge Pixel Portal
        </Link>
        . Doge Pixel holders get access to monthly perks, mints, and drops known
        as{" "}
        <Link bold isExternal href={"https://pixels.ownthedoge.com/perks"}>
          Pixel Perks
        </Link>
        .
      </div>
    </div>
  );
};

export const Daoge = () => {
  return (
    <div>
      <div className={css("flex", "justify-center", "mb-10")}>
        <div
          className={css("relative", "z-10", "w-full")}
          style={{ maxWidth: "200px" }}
        >
          <Image
            alt={"daoge"}
            src={"/images/monadoge.png"}
            layout={"responsive"}
            width={400}
            height={400}
            className={css("border-2", "z-10", "mx-auto")}
          />
        </div>
      </div>
      <div className={css("bg-pixels-yellow-100")}>
        After fractionalization,{" "}
        <Link bold isExternal href={"https://dao.ownthedoge.com"}>
          DAOge
        </Link>{" "}
        was formed to manage the community fund and guide The Doge NFT
        ecosystem. DOG allows holders to govern where The Doge NFT should go
        next.
      </div>
      <HelperContent>
        Check out our{" "}
        <Link
          isExternal
          href={
            "https://pleasr.mirror.xyz/7hpdJOWRzQx2pmCA16MDxN2FiA3eY6dwcrnEtXKnCJw"
          }
        >
          whitepaper
        </Link>
      </HelperContent>
    </div>
  );
};

export const BarkTank = () => {
  const router = useRouter();
  const { projects } = useHomeContext();
  return (
    <div>
      <div className={css("bg-pixels-yellow-100")}>
        Bark Tank acts an an incubator for the expansion of The Doge NFT
        ecosystem. Submit your ideas here. Great ideas, favored by the
        community, are eligible to receive funding from the DAOge.
      </div>
      <div className={css("mt-5")}>
        <div>
          <Button
            onClick={() =>
              window.open(env.app.barktankApplicationURL, "_blank")
            }
          >
            <div className={css("text-base")}>apply</div>
          </Button>
        </div>
        <div className={css("mt-3")}>
          <Button onClick={() => router.push("/barktank")}>
            <div className={css("text-base")}>View all projects</div>
          </Button>
        </div>
      </div>
      <div className={css("mt-14", "text-left")}>
        <div className={css("mb-2", "text-xl")}>Recent Projects</div>
        <div className={css("flex", "flex-col", "space-y-4", "mr-4")}>
          {projects.slice(0, 3).map((project) => (
            <BarkTankItem key={project.projectName} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface HomeItemsProps {
  height: number;
  onIntersection?: (id: string) => void;
}

export const navItems = [
  { title: "Doge", id: "doge", content: Doge },
  { title: "The Doge NFT", id: "dogenft", content: DogeNFT },
  { title: "$DOG", id: "dog", content: Dog },
  { title: "Pixels", id: "pixels", content: Pixels },
  { title: "DAOge", id: "daoge", content: Daoge },
  { title: "Bark Tank", id: "barktank", content: BarkTank },
];
const HomeItems = ({ height, onIntersection }: HomeItemsProps) => {
  return (
    <>
      {navItems.map((item) => {
        const Content = item.content;
        return (
          <HomeFeature
            key={`home-item-${item.id}`}
            id={item.id}
            height={height}
            onIntersection={onIntersection}
          >
            <Content />
          </HomeFeature>
        );
      })}
    </>
  );
};

export default HomeItems;
