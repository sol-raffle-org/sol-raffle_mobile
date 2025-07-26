"use client";

import { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";
import { Socket, io } from "socket.io-client";
import { usePathname } from "next/navigation";
import { updateFlipGameData } from "./helper";
import { COIN_FLIP, ROOT } from "@/constants/path.const";
import { FlipGameInterface } from "@/types/coin-flip.type";

import {
  JackpotGameStatus,
  PlayerBetInterface,
  JackpotGameDataInterface,
  GameStatusUpdateInterface,
  JackpotWinnerItemInterface,
  JackpotWinnerListInterface,
} from "@/types/jackpot.type";

import {
  showErrorToast,
  showLevelToast,
  showSuccessToast,
} from "@/components/common/custom-toast";

import {
  ID_COOL_DOWN_SOUND,
  ID_SPINNING_SOUND,
  ID_PLAYING_SOUND,
  ID_WINNING_SOUND,
  ID_PUMP_SOUND,
  KEY_TOKEN,
} from "@/constants/app.const";

import useJackpotStore from "@/stores/useJackpotStore";
import useAppStore from "@/stores/useAppStore";
import Cookies from "js-cookie";
import useCoinFlipStore from "@/stores/useCoinflipStore";

const RaffleSocketProvider = () => {
  const socketUrl = process.env.SOCKET_URL || "";
  const authToken = Cookies.get(KEY_TOKEN);

  const pathname = usePathname();
  const t = useTranslations("Common");

  const {
    accountInfo,
    soundOn,
    isEmitAuthenticate,
    setAppSocket,
    setIsEmitAuthenticate,
  } = useAppStore();
  const {
    jackpotGameData,
    setWinnerList,
    setJackpotGameData,
    setIsBettingJackpot,
  } = useJackpotStore();
  const { flipGamesTable, setFlipGamesTable } = useCoinFlipStore();

  const newEntryRef = useRef<HTMLVideoElement | null>(null);
  const playingRef = useRef<HTMLVideoElement | null>(null);
  const pumpRef = useRef<HTMLVideoElement | null>(null);

  const [raffleSocket, setRaffleSocket] = useState<Socket | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isAwarding, setIsAwarding] = useState(false);

  const [hasNewEntry, setHasNewEntry] = useState(false);
  const [isBetSuccess, setIsBetSuccess] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const handleEventJackpot = () => {
    if (!raffleSocket) return;

    raffleSocket.on("level-up", (levelUpData: any) => {
      if (levelUpData) {
        showLevelToast(
          levelUpData.upToLevel || "",
          `${levelUpData.exp || 0}/${levelUpData.nextLevelExp || 0}`
        );
      }
    });

    raffleSocket.on("server-message", (data: any) => {
      if (data?.success === true) {
        showSuccessToast(data?.message);
      }

      if (data?.success === false) {
        showErrorToast(data?.message);
      }
    });

    raffleSocket.on(
      "jp-game-data",
      (jackpotGameData: JackpotGameDataInterface) => {
        setJackpotGameData(jackpotGameData);
        if (jackpotGameData.status === JackpotGameStatus.Playing) {
          setIsPlaying(true);
        }
        if (jackpotGameData.status === JackpotGameStatus.Awarding) {
          setIsAwarding(true);
        }
      }
    );
  };

  const handleEventCoinFlip = () => {
    if (!raffleSocket) return;

    raffleSocket.on("fl-game-data", (flipGameData: FlipGameInterface[]) => {
      setFlipGamesTable(flipGameData);
    });
  };

  useEffect(() => {
    if (!socketUrl) return;

    const socket = io(socketUrl);

    setRaffleSocket(socket);
    setAppSocket(socket);
  }, [socketUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSocketConnected(raffleSocket?.connected || false);
  }, [raffleSocket, raffleSocket?.connected]);

  useEffect(() => {
    if (!raffleSocket) return;

    if (!raffleSocket.connected) {
      raffleSocket.connect();
    }

    if (pathname === ROOT) {
      raffleSocket.emit("jp-join-room");
      raffleSocket.emit("jp-game-data");
      raffleSocket.emit("notify-win-data");
    }

    if (pathname === COIN_FLIP) {
      raffleSocket.emit("fl-join-room");
      raffleSocket.emit("fl-game-data");
    }

    handleEventJackpot();
    handleEventCoinFlip();
  }, [raffleSocket, pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!raffleSocket) return;

    let tempWinnerList: JackpotWinnerListInterface | undefined = undefined;

    raffleSocket.on(
      "notify-win-data",
      (winnerList?: JackpotWinnerListInterface) => {
        tempWinnerList = winnerList;

        setWinnerList(winnerList);
      }
    );

    raffleSocket.on(
      "notify-win-update",
      (newWinner: JackpotWinnerItemInterface) => {
        if (!tempWinnerList) {
          setWinnerList({ data: [newWinner] });
        } else {
          const newList = [newWinner, ...tempWinnerList.data];

          if (newList.length > 20) {
            newList.shift();
          }
          const newData = { data: newList };
          setWinnerList(newData);
        }
      }
    );
  }, [raffleSocket]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pathname !== ROOT && raffleSocket && raffleSocket.connected) {
      raffleSocket.emit("jp-leave-room");

      raffleSocket.off("level-up");
      raffleSocket.off("server-message");
      raffleSocket.off("notify-win-data");
      raffleSocket.off("notify-win-update");
      raffleSocket.off("jp-status-update");
      raffleSocket.off("jp-player-bet");
      raffleSocket.off("jp-game-data");
    }

    if (pathname !== COIN_FLIP && raffleSocket && raffleSocket.connected) {
      raffleSocket.emit("fl-leave-room");
      raffleSocket.off("fl-create-table");
      raffleSocket.off("fl-sitdown-table");
      raffleSocket.off("fl-kick-user");
      raffleSocket.off("fl-approved-join-table");
      raffleSocket.off("fl-start-game");
      raffleSocket.off("fl-finish-game");
    }
  }, [raffleSocket, pathname]);

  useEffect(() => {
    if (
      !raffleSocket ||
      !accountInfo ||
      !authToken ||
      !socketConnected ||
      isEmitAuthenticate
    )
      return;
    setIsEmitAuthenticate(true);
    raffleSocket.emit("authenticate", { token: authToken });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    raffleSocket,
    accountInfo,
    authToken,
    socketConnected,
    isEmitAuthenticate,
  ]);

  useEffect(() => {
    if (!raffleSocket || !jackpotGameData) return;

    raffleSocket.on(
      "jp-status-update",
      (gameStatus: GameStatusUpdateInterface) => {
        if (gameStatus.status === JackpotGameStatus.Pending) {
          const newData = {
            ...gameStatus,
            bets: [],
            winner: null,
          };
          setJackpotGameData(newData as JackpotGameDataInterface);
        } else {
          if (gameStatus.status === JackpotGameStatus.Playing) {
            setIsPlaying(true);
          }
          if (gameStatus.status === JackpotGameStatus.Awarding) {
            setIsAwarding(true);
          }
          const newData = {
            ...jackpotGameData,
            ...gameStatus,
          };
          setJackpotGameData(newData as JackpotGameDataInterface);
        }
      }
    );

    raffleSocket.on("jp-player-bet", (betInfo: PlayerBetInterface) => {
      setHasNewEntry(true);

      if (!jackpotGameData?.bets) {
        const newData = {
          ...jackpotGameData,
          bets: [betInfo],
        } as JackpotGameDataInterface;
        setJackpotGameData(newData);
      } else {
        const newData = {
          ...jackpotGameData,
          bets: [betInfo, ...jackpotGameData.bets],
        } as JackpotGameDataInterface;
        setJackpotGameData(newData);
      }

      if (betInfo.userInfo.wallet === accountInfo?.wallet && !isBetSuccess) {
        setIsBetSuccess(true);
        setIsBettingJackpot(false);
        showSuccessToast(t("msgBetSuccessfully"));
      }
    });
  }, [raffleSocket, jackpotGameData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!raffleSocket) return;

    raffleSocket.on("fl-create-table", (newGameData: FlipGameInterface) => {
      const newData = updateFlipGameData(flipGamesTable, newGameData);
      setFlipGamesTable(newData);
    });

    if (!flipGamesTable?.length) return;

    raffleSocket.on("fl-sitdown-table", (data: any) => {
      const newData = updateFlipGameData(flipGamesTable, data);
      setFlipGamesTable(newData);
    });

    raffleSocket.on("fl-kick-user", (data: any) => {
      const newData = updateFlipGameData(flipGamesTable, data, true);
      setFlipGamesTable(newData);
    });

    raffleSocket.on("fl-approved-join-table", (data: any) => {
      const newData = updateFlipGameData(flipGamesTable, data);
      setFlipGamesTable(newData);
    });

    raffleSocket.on("fl-start-game", (data: any) => {
      const newData = updateFlipGameData(flipGamesTable, data);
      setFlipGamesTable(newData);
    });

    raffleSocket.on("fl-finish-game", (data: any) => {
      const newData = updateFlipGameData(flipGamesTable, data);

      setFlipGamesTable(newData);
    });
  }, [raffleSocket, flipGamesTable]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!hasNewEntry || pathname !== ROOT || !soundOn) return;

    if (newEntryRef.current) {
      newEntryRef.current.play();
    }

    setTimeout(() => setHasNewEntry(false), 1000);
  }, [hasNewEntry, pathname, soundOn]);

  useEffect(() => {
    if (!isPlaying || pathname !== ROOT || !soundOn) return;

    if (playingRef.current) {
      playingRef.current.play();
    }

    setTimeout(() => setIsPlaying(false), 1000);
  }, [isPlaying, pathname, soundOn]);

  useEffect(() => {
    if (!isAwarding || pathname !== ROOT || !soundOn) return;

    if (pumpRef.current) {
      pumpRef.current.play();
    }
    setTimeout(() => setIsAwarding(false), 1000);
  }, [isAwarding, pathname, soundOn]);

  useEffect(() => {
    if (!isBetSuccess) return;

    const betTimeout = setTimeout(() => setIsBetSuccess(false), 3000);

    return () => clearTimeout(betTimeout);
  }, [isBetSuccess]);

  useEffect(() => {
    if (!newEntryRef.current) return;

    const handleClickDocs = () => {
      const slotAudioElements = document.querySelectorAll(".slot-sound-effect");

      if (!slotAudioElements.length) return;
      slotAudioElements.forEach((item: any) => {
        item.muted = false;
        document.removeEventListener("click", handleClickDocs);
      });
    };

    document.addEventListener("click", handleClickDocs);
  }, []);

  return (
    <>
      <video
        ref={newEntryRef}
        muted
        playsInline
        src="/sounds/sound-new-entry.mp3"
        className="slot-sound-effect h-0 w-0 opacity-0"
      ></video>

      <video
        muted
        playsInline
        id={ID_SPINNING_SOUND}
        src="/sounds/sound-spinning.mp3"
        className="slot-sound-effect h-0 w-0 opacity-0"
      ></video>

      <video
        muted
        playsInline
        id={ID_COOL_DOWN_SOUND}
        src="/sounds/sound-cooldown.mp3"
        className="slot-sound-effect h-0 w-0 opacity-0"
      ></video>

      <video
        muted
        playsInline
        id={ID_WINNING_SOUND}
        src="/sounds/sound-winning.mp3"
        className="slot-sound-effect h-0 w-0 opacity-0"
      ></video>

      <video
        muted
        ref={playingRef}
        playsInline
        id={ID_PLAYING_SOUND}
        src="/sounds/sound-playing.mp3"
        className="slot-sound-effect h-0 w-0 opacity-0"
      ></video>

      <video
        muted
        ref={pumpRef}
        playsInline
        id={ID_PUMP_SOUND}
        src="/sounds/sound-pump.mp3"
        className="slot-sound-effect h-0 w-0 opacity-0"
      ></video>
    </>
  );
};

export default RaffleSocketProvider;
