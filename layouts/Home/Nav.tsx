import {css} from "../../helpers/css";
import NavItem from "../../components/NavItem/NavItem";
import Button from "../../components/Button/Button";
import {vars} from "../../environment/vars";
import React, {useContext, useState} from "react";
import LinksModal from "./LinksModal";
import {navItems} from "../../components/Home/HomeItems";
import Image from "next/image";

const NavContext = React.createContext<any>("doge")
export const NavProvider = NavContext.Provider
export const useNavContext = () => useContext(NavContext)

const Nav = () => {
    const [selection] = useNavContext()
    const [isDocsModalVisible, setIsDocsModalVisible] = useState(false)
    return <div className={css("flex", "flex-col", "justify-between", "md:col-span-3", "xl:col-span-2", "sticky")}>
        <div className={css("flex", "items-center", "justify-center", "grow", "border-b-2", "md:border-b-0", "border-pixels-yellow-200", "border-dashed")}>
            <div className={css("text-3xl", "flex", "md:flex-col", "gap-10", "px-10",)}>
                {navItems.map(item => {
                    const isSelected = item.id === selection
                    return <div key={item.id} className={css("relative", "md:inline-block", "max-w-max", "mb-3", "md:mb-0", {"hidden": !isSelected})}>
                        {isSelected && <div className={css("absolute", "text-2xl")} style={{top: "50%", left: -35, transform: "translateY(-50%)"}}>✨</div>}
                        <NavItem isSelected={isSelected} onClick={() => {
                            document.getElementById(item.id)?.scrollIntoView({behavior: "smooth"})
                            window.history.replaceState({ ...window.history.state, as: `/?wow=${item.id}`, url: `/?wow=${item.id}` }, '', `/?wow=${item.id}`);
                        }}>
                            {item.title}
                        </NavItem>
                        {isSelected && <div className={css("absolute", "text-2xl")} style={{top: "50%", right: -35, transform: "translateY(-50%)"}}>✨</div>}
                    </div>
                })}
            </div>
        </div>
        <div className={css("flex", "items-center")}>
            <div className={css("hidden", "md:flex", "md:flex-col", "items-start", "gap-4", "py-5")}>
                <Button onClick={() => {
                    window.open(vars.NEXT_PUBLIC_DISCORD_LINK, '_blank')
                }}>discord</Button>
                <Button onClick={() => {
                    window.open(vars.NEXT_PUBLIC_TWITTER_LINK, '_blank')
                }}>twitter</Button>
                <Button onClick={() => setIsDocsModalVisible(!isDocsModalVisible)}>links</Button>
            </div>
            <div className={css("relative", "grow", "ml-16")}>
                <Image src={"/images/star.svg"} layout={'responsive'} width={500} height={500}/>
            </div>
        </div>
        <LinksModal open={isDocsModalVisible} onChange={(value) => setIsDocsModalVisible(value)}/>
    </div>
}

export default Nav