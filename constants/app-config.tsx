import { Cluster } from '@/components/cluster/cluster'
import { ClusterNetwork } from '@/components/cluster/cluster-network'
import { clusterApiUrl } from '@solana/web3.js'

export class AppConfig {
  static name = 'sol-raffle'
  static uri = 'https://solraffle.xyz'
  static clusters: Cluster[] = [
    {
      id: 'solana:mainnet-beta',
      name: 'Mainnet',
      endpoint: clusterApiUrl('mainnet-beta'),
      network: ClusterNetwork.Mainnet,
    },
    {
      id: 'solana:devnet',
      name: 'Devnet',
      endpoint: clusterApiUrl('devnet'),
      network: ClusterNetwork.Devnet,
    },
  ]
}
