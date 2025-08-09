import { FlipGameInterface, FlipGameStatusEnum } from '@/types/coin-flip.type'

export const updateFlipGameData = (flipGameData?: FlipGameInterface[], updatedData?: any, kick?: boolean) => {
  if (!flipGameData?.length && updatedData) {
    return [updatedData]
  }
  if (!flipGameData?.length || !updatedData) return

  if (updatedData.status === FlipGameStatusEnum.Created && !kick) {
    const temp = [...flipGameData]
    const currentTime = Math.floor(Date.now() / 1000)
    const firstItemEnd = temp.findIndex((item) => {
      return Number(item.deleteTime || 0) > 0 && currentTime >= Math.floor((item?.deleteTime || 0) / 1000)
    })
    if (firstItemEnd !== -1) {
      temp[firstItemEnd] = updatedData
    } else {
      temp.push(updatedData)
    }

    return temp
  }

  const newGameData = flipGameData.map((item) => {
    const matched =
      item.userCreator.wallet === (updatedData.creator || updatedData?.userCreator?.wallet) &&
      (item.gameId === updatedData.gameId || item.seed === updatedData?.seed)

    return matched
      ? {
          ...item,
          ...updatedData,
          userJoin: kick === true ? null : updatedData?.userJoin || item.userJoin,
        }
      : item
  }) as FlipGameInterface[]

  return newGameData as FlipGameInterface[]
}
