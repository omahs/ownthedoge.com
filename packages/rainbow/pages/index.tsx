import { useQuery } from "@tanstack/react-query";
import Button from "dsl/components/Button/Button";
import ColoredText from "dsl/components/ColoredText/ColoredText";
import { Divider } from "dsl/components/Divider/Divider";
import Link, { LinkType } from "dsl/components/Link/Link";
import { ProgressBar } from "dsl/components/ProgressBar/ProgressBar";
import { Tabs } from "dsl/components/Tabs/Tabs";
import { css } from "dsl/helpers/css";
import { abbreviate } from "dsl/helpers/strings";
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from "next/image";
import { PropsWithChildren, ReactNode, useCallback } from "react";
import { BsArrowRight } from "react-icons/bs";
import { ClientSide, Donation, getDonations, getLeaderboard, getSwaps, RainbowSwap } from "../api";
import DonateModal from "../components/DonateModal";
import { TabType, useAppStore } from "../store/app.store";

const Home: NextPage = () => {
  const state = useAppStore((state) => state)

  const {
    isLoading: isDonationsLoading,
    error: donationsError,
    data: donations
  } = useQuery(['getDonations'], getDonations)
  // console.log("donations", donations)

  const {
    isLoading: isSwapsLoading,
    error: swapsError,
    data: swaps
  } = useQuery(['getSwaps'], getSwaps)
  // console.log("swaps", swaps)

  const {
    isLoading: isLeaderboardLoading,
    error: leaderBoardError,
    data: leaderboard
  } = useQuery(['getLeaderboard'], getLeaderboard)
  // console.log("leaderboard", leaderboard)


  const max = 50000
  const now = 25000
  const min = 0

  return (
    <>
      <Head>
        <title>Bronze The Doge</title>
        <meta name="description" content="Help us build a statue of the Doge, Kabosu, in her hometown"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={css("relative", "overflow-hidden", "p-5", "mt-8")}>
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

            <section className={css("text-center")}>
              <div className={css("text-xl", "mt-20", "mb-24")}>
                <ProgressBar minLabel={"$"+min.toLocaleString()} maxLabel={"$"+max.toLocaleString()} nowLabel={"$"+now.toLocaleString()} max={max} min={min} now={now} thumb={<div 
                className={css("relative", "w-full", "h-full", "border-2", "rounded-full", "border-black", "bg-yellow-400", "overflow-hidden")}>
                  <div className={css("absolute", "w-[80px]", "-left-[18px]", "-top-[3px]")}>
                    <Image layout={"responsive"} src={"/images/doge-birthday.png"} width={229} height={258}/>
                  </div>
                </div>}/>
              </div>
              <div>
                <Button emojisForExploding={["🌈", "🌈", "🌈"]} onClick={() => {
                  state.setIsDonateDialogOpen(true)
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
              <div>
                <Tabs
                  className={css("mb-2", "text-xl")}
                  items={Object.keys(TabType).map(tab => ({name: tab, key: tab}))}
                  onClick={(type) => state.setCampaignTab(type as TabType)}
                  selected={state.campaignTab}
                />
                <div className={css("flex", "flex-col", "gap-5", "h-[500px]", "overflow-y-auto", "overflow-x-hidden", "pr-4", "pb-4")}>
                  {state.campaignTab === TabType.Donations && <RenderIfValid notValidLabel={"No donations yet 🥹"} isValid={donations && donations.length > 0}>
                      {donations?.map(donation => <DonateItem key={`${donation.txHash}`} item={donation}/>)}
                  </RenderIfValid>}
                  {state.campaignTab === TabType.Swaps && <RenderIfValid notValidLabel={"No swaps yet 🥹"} isValid={swaps && swaps.length > 0}>
                      {swaps?.map(swap => <SwapItem key={`${swap.txHash}`} item={swap}/>)}
                  </RenderIfValid>}
                </div>
              </div>
            </section>

            <section className={css("flex", "flex-col", "items-center", "mt-14")}>
              <TitleDivider>Rewards</TitleDivider>
              <div className={css("flex", "justify-center", "w-full")}>
                <div className={css("flex", "flex-col", "w-full", "gap-5")}>
                  <div className={css("max-w-xl", "w-full")}>
                    <RewardButton title={"Rainbow Doge Icon & POAP"} description={"Swap for 42,069 $DOG on Rainbow"}/>
                  </div>
                  <div className={css("max-w-xl", "self-end", "w-full")}>
                    <RewardButton title={"Rainbow Doge Icon & POAP + Chance to Win Pixel"}
                                  description={"Swaps for 42,069 $DOG on Rainbow and mint a Doge Pixel"}/>
                  </div>
                  <div className={css("max-w-xl", "w-full")}>
                    <RewardButton title={"Rainbow Doge Icon & POAP + Chance to Win 25 Pixels"}
                                  description={"Swap for 42,069 $DOG on Rainbow, mint a Doge Pixel, and donate directly to the cause!"}/>
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
                <div className={css("flex", "flex-col", "gap-5", "h-[350px]", "overflow-y-auto", "pr-4", "pb-4")}>
                  {state.leaderboardTab === TabType.Donations && <RenderIfValid notValidLabel={"No donations yet 🥹"} isValid={leaderboard && leaderboard?.donations?.length > 0}>
                      {leaderboard?.donations?.map(donation => <DonateItem key={`${donation.txHash}`} item={donation}/>)}
                  </RenderIfValid>}
                  {state.leaderboardTab === TabType.Swaps && <RenderIfValid notValidLabel={"No swaps yet 🥹"} isValid={leaderboard && leaderboard?.swaps?.length > 0}>
                      {leaderboard?.swaps?.map(swap => <SwapItem key={`${swap.txHash}`} item={swap}/>)}
                  </RenderIfValid>}
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
                    <div className={css("inline-block", "relative")}>
                      <Button>
                        <div className={css("p-2", "max-w-xs", "text-xl")}>Help us build {`Kabosu's`} statue in her
                          hometown.
                        </div>
                      </Button>
                      <div className={css("max-w-[50px]", "absolute", "w-full", "right-0", "-top-[38px]")}>
                        <Image layout={"responsive"} width={182} height={154} src={"/images/pixel-doge.png"}/>
                      </div>
                    </div>
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
      {state.isDonateDialogOpen && <DonateModal />}
    </>
  )
}

interface RenderIfValidProps {
  isValid?: boolean;
  notValidLabel: string;
}

const RenderIfValid: React.FC<PropsWithChildren<RenderIfValidProps>> = ({ isValid, children, notValidLabel }) => {
  if (isValid) {
    return <>{children}</>
  }

  return <div className={css("h-full", "flex", "justify-center", "items-center", "border-2", "border-dashed", 
  "border-pixels-yellow-200", "text-pixels-yellow-400", "text-xl", "flex-grow")}>
  <div>{notValidLabel}</div>
</div>
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

const DonateItem: React.FC<PropsWithChildren<{ item: Donation }>> = ({item}) => {
  return <Button block>
    <div className={css("w-full", "p-1")}>
      <div className={css("flex", "justify-between", "text-2xl")}>
        <div>{item.currency}</div>
        <div>+{item.amount}</div>
      </div>
      <div className={css("flex", "justify-between", "items-center", "mt-1")}>
        <div className={css("font-normal", "text-lg")}>{item.clientAddress}</div>
        <Pill type={"donation"}/>
      </div>
    </div>
  </Button>
}

const SwapItem: React.FC<PropsWithChildren<{ item: RainbowSwap }>> = ({item}) => {
  const renderSwapIndicator = useCallback(() => {
    if (item.clientSide === ClientSide.SELL) {
      return <>
        <div>{item.baseCurrency}</div>
        <div>
          <BsArrowRight size={25}/>
        </div>
        <div>{item.quoteCurrency}</div>
      </>
    }
    return <>
        <div>{item.quoteCurrency}</div>
        <div>
          <BsArrowRight size={25}/>
        </div>
        <div>{item.baseCurrency}</div>
      </>
  }, [item.clientSide])

  return <Link isExternal href={`https://etherscan.io/tx/${item.txHash}`}>
    <Button block>
    <div className={css("w-full", "p-1")}>
      <div className={css("flex", "justify-between", "text-2xl")}>
        <div className={css("flex", "items-center", "gap-2")}>
          {renderSwapIndicator()}
        </div>
        <div>
          ~${item.donatedUSDNotional.toLocaleString()}
        </div>
      </div>
      <div className={css("flex", "justify-between", "items-center", "mt-1")}>
        <div className={css("font-normal", "text-lg")}>{item.clientEns ? item.clientEns : abbreviate(item.clientAddress, 4)}</div>
        <Pill type={"swap"}/>
      </div>
    </div>
  </Button>
  </Link>
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

export default Home
