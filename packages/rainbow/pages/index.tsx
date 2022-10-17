import type {NextPage} from 'next'
import Head from 'next/head'
import {css} from "dsl/helpers/css";
import Image from "next/image"
import Button from "dsl/src/Button/Button";
import {Divider} from "dsl/src/Divider/Divider";
import {PropsWithChildren, ReactNode, Suspense, useEffect, useRef} from "react";
import ColoredText from "dsl/src/ColoredText/ColoredText";
import {Donar, Swapper, TabType, useAppStore} from "../store/app.store";
import Link, {LinkType} from "dsl/src/Link/Link";
import {Canvas, useLoader, useThree} from "@react-three/fiber";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import {PresentationControls} from "@react-three/drei"
import {getDonars} from "../api";
import {useQuery} from "@tanstack/react-query";
import {Tabs} from "dsl/src/Tabs/Tabs";
import {BsArrowRight} from "react-icons/all";

const Home: NextPage = () => {
  const state = useAppStore((state) => state)

  const {
    isLoading,
    error,
    data
  } = useQuery(['getDonars'], getDonars)
  console.log("debug:: data", data)
  return (
    <>
      <Head>
        <title>Rainbow x The Doge NFT</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={css("relative", "overflow-hidden", "p-5")}>
        <div className={css("flex", "justify-center")}>
          <div className={css("max-w-4xl", "w-full")}>
            <section className={css("flex", "justify-center", "items-center", "gap-6")}>
              <BirthdayStar/>
              <div className={css("text-center")}>
                <div className={css("text-4xl", "font-bold")}>
                  Doge Turns 17!
                </div>
                <div className={css("mt-1")}>(yes {`that's`} right! - this Shiba Inu is turning 84 in human years)</div>
              </div>
              <BirthdayStar/>
            </section>

            <section>
              <ThreeScene/>
            </section>

            <section className={css("text-center", "mt-4")}>
              <div>indicator here</div>
              <div className={css("mt-2")}>
                <Button emojisForExploding={["🌈", "🌈", "🌈"]} onClick={() => {
                  console.log("debug:: show modal")
                }}>
                  <div className={css("text-2xl")}>
                    ✨ DONATE ✨
                  </div>
                </Button>
              </div>
            </section>

            <section
              className={css("text-center", "text-xl", "mt-14", "grid", "grid-cols-1", "lg:grid-cols-2", "gap-8")}>
              <div className={css("flex", "flex-col", "gap-5")}>
                <div className={css("font-bold", "text-3xl")}>
                  About this campaign
                </div>
                <div>
                  {`It's`} Kabosu, the Doge’s 17th Borkday and we- ownthedoge along with Atsuko Sato (Doges Momma),
                  Rainbow, doge
                  pound and NFD need you to help make it Bronze!
                </div>
                <div>
                  We take this initiative to build <ColoredText className={css("font-bold")}>AN IRL KABOSU BRONZE
                  STATUE</ColoredText> in Sakura Park,
                  Japan along with PleasrDAO,
                  Rainbow, Dogecoin Foundation and NFD. As the Doge friends unite for this iconic moment to come in meme
                  history, we call on you to donate to this cause and make Kabosu immortal.
                </div>
                <div>
                  <div>
                    You can donate two ways:
                  </div>
                  <ol>
                    <li>
                      1: Swap for $DOG on Rainbow
                    </li>
                    <li>
                      2: Donate to the cause directly
                    </li>
                  </ol>
                </div>
                <div>
                  Along the way, we’ll be giving out $DOG and many more surprises.
                  Cheers to 17 years of our beloved and many more to come!
                </div>
              </div>
              <div
                className={css("items-center")}>
                <Tabs
                  className={css("mb-2", "text-xl")}
                  items={Object.keys(TabType).map(tab => ({name: tab, key: tab}))}
                  onClick={(type) => state.setCampaignTab(type as TabType)}
                  selected={state.campaignTab}
                />
                <div
                  className={css("flex", "flex-col", "gap-5", "max-h-[500px]", "overflow-y-auto", "overflow-x-hidden", "pr-4", "pb-4")}>
                  {state.campaignTab === TabType.Donate && state.donars.map(donar => <DonateItem
                    key={`${donar.txHash}`} item={donar}/>)}
                  {state.campaignTab === TabType.Swap && state.swappers.map(swap => <SwapItem key={`${swap.txHash}`}
                                                                                              item={swap}/>)}
                </div>
              </div>
            </section>

            <section className={css("flex", "flex-col", "items-center", "mt-14")}>
              <TitleDivider>Rewards</TitleDivider>
              <div className={css("flex", "justify-center", "w-full")}>
                <div className={css("flex", "flex-col", "w-full", "gap-5")}>
                  <div className={css("max-w-xl", "w-full")}>
                    <RewardButton title={"100 Doge Pixels"} description={"Swap for 42,069 $DOG on Rainbow"}/>
                  </div>
                  <div className={css("max-w-xl", "self-end", "w-full")}>
                    <RewardButton title={"60 Doge Pixels"}
                                  description={"Swap for 42,069 $DOG on Rainbow and mint a Doge Pixel"}/>
                  </div>
                  <div className={css("max-w-xl", "w-full")}>
                    <RewardButton title={"20 Doge Pixels"}
                                  description={"Swap for 42,069 $DOG on Rainbow, mints a Doge Pixel, and donates directly to the cause!"}/>
                  </div>
                </div>
              </div>
              <div className={css("font-bold", "mt-12", "text-2xl", "text-center")}>
                All holders of $DOG and Doge Pixels unlock a custom Doge icon on Rainbow!
              </div>
            </section>

            <section className={css("mt-14")}>
              <TitleDivider>Leaderboard</TitleDivider>
              <div>
                <Tabs
                  className={css("mb-2", "text-xl")}
                  items={Object.keys(TabType).map(tab => ({name: tab, key: tab}))}
                  onClick={(type) => state.setLeaderboardTab(type as TabType)}
                  selected={state.leaderboardTab}
                />
                <div className={css("flex", "flex-col", "gap-5", "max-h-[500px]", "overflow-y-auto", "pr-4", "pb-4")}>
                  {state.leaderboardTab === TabType.Donate && state.donars.map(donar => <DonateItem
                    key={`${donar.txHash}`} item={donar}/>)}
                  {state.leaderboardTab === TabType.Swap && state.swappers.map(swap => <SwapItem key={`${swap.txHash}`}
                                                                                                 item={swap}/>)}
                </div>
              </div>
            </section>

            <footer className={css("my-28")}>
              <Divider/>
              <div className={css("grid", "grid-cols-1", "md:grid-cols-2", "my-14", "gap-12")}>
                <div className={css("grid", "grid-cols-2", "order-2", "md:order-1")}>
                  <div className={css("flex", "flex-col", "items-start")}>
                    <div className={css("font-bold")}>The Doge NFT</div>
                    <Link type={LinkType.Black} isExternal href={"https://ownthedoge.com"}>About</Link>
                    <Link type={LinkType.Black} isExternal href={"https://pixels.ownthedoge.com"}>Mint Pixels</Link>
                    <Link type={LinkType.Black} isExternal href={"https://pixels.ownthedoge.com/perks"}>Pixel
                      Perks</Link>
                    <Link type={LinkType.Black} isExternal
                          href={"https://www.coingecko.com/en/coins/the-doge-nft"}>Aquire</Link>
                  </div>
                  <div className={css("flex", "flex-col")}>
                    <div className={css("font-bold")}>Rainbow</div>
                    <Link type={LinkType.Black} isExternal href={"https://rainbow.me/"}>Download</Link>
                    <Link type={LinkType.Black} isExternal href={"https://twitter.com/rainbowdotme"}>Twitter</Link>
                    <Link type={LinkType.Black} isExternal href={"https://learn.rainbow.me/"}>Learn</Link>
                  </div>
                </div>
                <div
                  className={css("flex", "justify-center", "md:justify-end", "order-1", "md:order-2")}>
                  <Button>
                    <div className={css("p-2", "max-w-xs", "text-xl")}>Help us build {`Kabosu's`} statue in her
                      hometown.
                    </div>
                  </Button>
                </div>
              </div>
              <Divider/>
            </footer>
          </div>
        </div>

        <div className={css("z-10")}>
          <div
            className={css("absolute", "-bottom-[60px]", "-left-[40px]", "md:-bottom-[140px]", "md:-left-[100px]", "rotate-[30deg]", "max-w-[150px]", "md:max-w-[305px]", "w-full")}>
            <Image src={"/images/doge.png"} height={320.25} width={320.75} layout={"responsive"}/>
          </div>
          <div
            className={css("absolute", "-bottom-[60px]", "-right-[20px]", "md:-bottom-[75px]", "md:-right-[75px]", "rotate-[270deg]", "max-w-[150px]", "md:max-w-[220px]", "w-full")}>
            <Image src={"/images/rainbow.svg"} width={225} height={225} layout={"responsive"}/>
          </div>

          <div className={css("flex", "justify-center", "text-xl", "z-10", "gap-5")}>
            <span className={css("font-bold", "z-10", "text-center")}>The Doge NFT</span>
            <span>🤝</span>
            <span className={css("max-w-[100px]", "w-full")}>
              <Image src={"/images/rainbow-logo.svg"} height={30} width={100} layout={"responsive"}/>
            </span>
          </div>
        </div>
      </main>
    </>
  )
}

const BirthdayStar = () => {
  return <div className={css("relative")}>
    <Image src={"/images/star.svg"} width={175} height={175}/>
    <div
      className={css("absolute", "w-full", "h-full", "flex", "justify-center", "items-center", "-top-[7px]", "-right-[6px]")}>
      <div className={css("text-5xl")}>🎂</div>
    </div>
  </div>
}

const RewardButton: React.FC<PropsWithChildren<{ title: string, description: string }>> = ({title, description}) => {
  return <Button block>
    <div className={css("p-1")}>
      <div className={css("text-left", "text-2xl")}>{title}</div>
      <div className={css("font-normal", "text-left", "text-lg")}>{description}</div>
    </div>
  </Button>
}

const TitleDivider: React.FC<PropsWithChildren<{ children: ReactNode }>> = ({children}) => {
  return <div className={css("w-full")}>
    <div className={css("text-2xl", "font-bold", "text-center")}>{children}</div>
    <div className={css("my-4", "w-full")}>
      <Divider/>
    </div>
  </div>
}

const DonateItem: React.FC<PropsWithChildren<{ item: Donar }>> = ({item}) => {
  return <Button block>
    <div className={css("w-full", "p-1")}>
      <div className={css("flex", "justify-between", "text-2xl")}>
        <div>{item.currency}</div>
        <div>+{item.amount}</div>
      </div>
      <div className={css("flex", "justify-between", "items-center", "mt-1")}>
        <div className={css("font-normal")}>{item.ens}</div>
        <Pill type={"donation"}/>
      </div>
    </div>
  </Button>
}

const SwapItem: React.FC<PropsWithChildren<{ item: Swapper }>> = ({item}) => {
  return <Button block>
    <div className={css("w-full", "p-1")}>
      <div className={css("flex", "justify-between", "text-2xl")}>
        <div className={css("flex", "items-center", "gap-2")}>
          <div>{item.baseCurrency}</div>
          <div>
            <BsArrowRight size={25}/>
          </div>
          <div>{item.quoteCurrency}</div>
        </div>
        <div>
          +{item.amountDonated}
        </div>
      </div>
      <div className={css("flex", "justify-between", "items-center", "mt-1")}>
        <div className={css("font-normal")}>{item.ens}</div>
        <Pill type={"swap"}/>
      </div>
    </div>
  </Button>
}

const donationStyle = css("bg-doge-orange")
const swapStyle = css("bg-doge-blue")

const Pill: React.FC<PropsWithChildren<{ type: "donation" | "swap" }>> = ({type}) => {
  return <span
    style={{borderWidth: "1px"}}
    className={css("inline-block", "font-normal", "text-sm", "border-black", "rounded-full", "px-2", "py-0.5", {
      [donationStyle]: type === "donation",
      [swapStyle]: type === "swap"
    })}>
    {type === "donation" ? "donation" : "🌈 swap"}
  </span>
}

const ThreeScene = () => {
  return <div className={css("border-dashed", "border-2", "border-pixels-yellow-200")}>
    <Canvas camera={{position: [0, 20, 60]}}>
      <Suspense fallback={null}>
        <PresentationControls
          enabled={true} // the controls can be disabled by setting this to false
          global={false} // Spin globally or by dragging the model
          cursor={true} // Whether to toggle cursor style on drag
          snap={false} // Snap-back to center (can also be a spring config)
          speed={1} // Speed factor
          zoom={1} // Zoom factor when half the polar-max is reached
          rotation={[0, 0, 0]} // Default rotation
          polar={[0, Math.PI / 2]} // Vertical limits
          azimuth={[-Infinity, Infinity]} // Horizontal limits
          config={{mass: 1, tension: 170, friction: 26}} // Spring config
        >
          <Model/>
        </PresentationControls>
        <ambientLight intensity={0.5}/>
      </Suspense>
    </Canvas>
  </div>
}

const Model = () => {
  const ref = useRef<any>()
  const model = useLoader(STLLoader, "/models/doge.stl")
  const {camera} = useThree()
  useEffect(() => {
    camera.lookAt(ref.current.position)
  }, [])
  return <mesh ref={ref}>
    <primitive object={model} attach={"geometry"}/>
    <meshStandardMaterial color={"black"}/>
  </mesh>
}
Model.displayName = "Model"

export default Home
