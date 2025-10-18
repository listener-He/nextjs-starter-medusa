"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Home: "/",
  Products: "/store",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  aria-label="Open menu"
                  className="relative h-full flex items-center gap-2 transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="small:inline hidden">Menu</span>
                </Popover.Button>
              </div>

              <Transition show={open} as={Fragment}>
                {/* Overlay fades in/out and closes on click */}
                <Transition.Child
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div
                    className="fixed inset-0 bg-black/50 z-30"
                    aria-hidden="true"
                    onClick={close}
                  />
                </Transition.Child>

                {/* Panel slides from the left with unified duration */}
                <Transition.Child
                  enter="transform transition ease-out duration-200"
                  enterFrom="-translate-x-full opacity-0"
                  enterTo="translate-x-0 opacity-100"
                  leave="transform transition ease-in duration-200"
                  leaveFrom="translate-x-0 opacity-100"
                  leaveTo="-translate-x-full opacity-0"
                >
                  <PopoverPanel className="fixed left-0 top-0 bottom-0 flex flex-col w-[88%] xsmall:w-3/4 small:w-1/3 2xl:w-1/4 h-screen z-[31] text-sm text-ui-fg-on-color">
                    <div
                      data-testid="nav-menu-popup"
                      className="flex flex-col h-full bg-[rgba(3,7,18,0.85)] backdrop-blur-2xl rounded-none justify-between p-6"
                    >
                      <div className="flex justify-end" id="xmark">
                        <button data-testid="close-menu-button" onClick={close} aria-label="Close menu">
                          <XMark />
                        </button>
                      </div>
                      <ul className="flex flex-col gap-6 items-start justify-start">
                        {Object.entries(SideMenuItems).map(([name, href]) => {
                          return (
                            <li key={name}>
                              <LocalizedClientLink
                                href={href}
                                className="text-3xl leading-10 hover:text-ui-fg-disabled"
                                onClick={close}
                                data-testid={`${name.toLowerCase()}-link`}
                              >
                                {name}
                              </LocalizedClientLink>
                            </li>
                          )
                        })}
                      </ul>
                      <div className="flex flex-col gap-y-6">
                        <div
                          className="flex justify-between"
                          onMouseEnter={toggleState.open}
                          onMouseLeave={toggleState.close}
                        >
                          {regions && (
                            <CountrySelect toggleState={toggleState} regions={regions} />
                          )}
                          <ArrowRightMini
                            className={clx(
                              "transition-transform duration-200",
                              toggleState.state ? "-rotate-90" : ""
                            )}
                          />
                        </div>
                        <Text className="flex justify-between txt-compact-small">
                          © {new Date().getFullYear()} STORE. All rights reserved.
                        </Text>
                      </div>
                    </div>
                  </PopoverPanel>
                </Transition.Child>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
