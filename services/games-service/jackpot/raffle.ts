/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/raffle.json`.
 */
export type Raffle = {
  address: "Fbedir6RBiGtyiscFUZmqaKUE9seQvu2LtDTNMoYRobb";
  metadata: {
    name: "raffle";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "closeRound";
      discriminator: [149, 14, 81, 88, 230, 226, 234, 37];
      accounts: [
        {
          name: "gameState";
          writable: true;
        },
        {
          name: "roundAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 97, 102, 102, 108, 101, 95, 114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "round_account.id";
                account: "round";
              }
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "createRound";
      discriminator: [229, 218, 236, 169, 231, 80, 134, 112];
      accounts: [
        {
          name: "gameState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  103,
                  97,
                  109,
                  101,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "roundAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 97, 102, 102, 108, 101, 95, 114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "game_state.total_rounds.checked_add(1)";
                account: "gameState";
              }
            ];
          };
        },
        {
          name: "currentRoundAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 97, 102, 102, 108, 101, 95, 114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "game_state.current_round_id";
                account: "gameState";
              }
            ];
          };
        },
        {
          name: "betQueue";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 97, 102, 102, 108, 101, 95, 98, 101, 116, 95, 113, 117, 101, 117, 101];
              }
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "finishRound";
      discriminator: [23, 104, 163, 186, 110, 225, 11, 242];
      accounts: [
        {
          name: "gameState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  103,
                  97,
                  109,
                  101,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "roundAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 97, 102, 102, 108, 101, 95, 114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "round_account.id";
                account: "round";
              }
            ];
          };
        },
        {
          name: "winnerBetAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  98,
                  101,
                  116,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ];
              },
              {
                kind: "account";
                path: "winnerAccount";
              }
            ];
          };
        },
        {
          name: "winnerAccount";
          writable: true;
        },
        {
          name: "feeAccount";
          writable: true;
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "serverSeed";
          type: "string";
        },
        {
          name: "blockNumber";
          type: "u64";
        },
        {
          name: "blockhash";
          type: "string";
        },
        {
          name: "totalBets";
          type: "u64";
        },
        {
          name: "totalAmount";
          type: "u64";
        },
        {
          name: "totalTickets";
          type: "u64";
        },
        {
          name: "winningNumber";
          type: "u64";
        }
      ];
    },
    {
      name: "forceCloseRound";
      discriminator: [141, 103, 223, 66, 159, 228, 54, 218];
      accounts: [
        {
          name: "gameState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  103,
                  97,
                  109,
                  101,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "roundAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 97, 102, 102, 108, 101, 95, 114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "round_account.id";
                account: "round";
              }
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "initBetAccount";
      discriminator: [229, 240, 116, 140, 5, 177, 61, 69];
      accounts: [
        {
          name: "betAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  98,
                  101,
                  116,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ];
              },
              {
                kind: "account";
                path: "player";
              }
            ];
          };
        },
        {
          name: "player";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "gameState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  103,
                  97,
                  109,
                  101,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "betQueue";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 97, 102, 102, 108, 101, 95, 98, 101, 116, 95, 113, 117, 101, 117, 101];
              }
            ];
          };
        },
        {
          name: "round";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 97, 102, 102, 108, 101, 95, 114, 111, 117, 110, 100];
              },
              {
                kind: "const";
                value: [0, 0, 0, 0, 0, 0, 0, 0];
              }
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "feeAccount";
          type: "pubkey";
        }
      ];
    },
    {
      name: "placeBet";
      discriminator: [222, 62, 67, 220, 63, 166, 126, 33];
      accounts: [
        {
          name: "gameState";
          writable: true;
        },
        {
          name: "roundAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 97, 102, 102, 108, 101, 95, 114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "round_account.id";
                account: "round";
              }
            ];
          };
        },
        {
          name: "betQueue";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 97, 102, 102, 108, 101, 95, 98, 101, 116, 95, 113, 117, 101, 117, 101];
              }
            ];
          };
        },
        {
          name: "betAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  98,
                  101,
                  116,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ];
              },
              {
                kind: "account";
                path: "player";
              }
            ];
          };
        },
        {
          name: "player";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "startRound";
      discriminator: [144, 144, 43, 7, 193, 42, 217, 215];
      accounts: [
        {
          name: "gameState";
          writable: true;
        },
        {
          name: "roundAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 97, 102, 102, 108, 101, 95, 114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "round_account.id";
                account: "round";
              }
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        }
      ];
      args: [
        {
          name: "serverSeed";
          type: "string";
        },
        {
          name: "blockNumber";
          type: "u64";
        }
      ];
    },
    {
      name: "toggleMaintenance";
      discriminator: [86, 161, 7, 90, 153, 252, 209, 130];
      accounts: [
        {
          name: "gameState";
          writable: true;
        },
        {
          name: "operator";
          writable: true;
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: "updateGameConfig";
      discriminator: [180, 82, 7, 205, 89, 182, 61, 128];
      accounts: [
        {
          name: "gameState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  103,
                  97,
                  109,
                  101,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        }
      ];
      args: [
        {
          name: "roundDuration";
          type: {
            option: "i64";
          };
        },
        {
          name: "calculationDelay";
          type: {
            option: "i64";
          };
        },
        {
          name: "minBets";
          type: {
            option: "u8";
          };
        },
        {
          name: "minimumBet";
          type: {
            option: "u64";
          };
        },
        {
          name: "feePercentage";
          type: {
            option: "i16";
          };
        },
        {
          name: "feeAccount";
          type: {
            option: "pubkey";
          };
        },
        {
          name: "gasFees";
          type: {
            option: "u64";
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: "betAccount";
      discriminator: [117, 187, 165, 174, 194, 28, 119, 76];
    },
    {
      name: "betQueue";
      discriminator: [59, 48, 247, 111, 200, 107, 82, 246];
    },
    {
      name: "gameState";
      discriminator: [144, 94, 208, 172, 248, 99, 134, 120];
    },
    {
      name: "round";
      discriminator: [87, 127, 165, 51, 73, 78, 116, 174];
    }
  ];
  events: [
    {
      name: "betAccountInitialized";
      discriminator: [17, 123, 197, 166, 90, 54, 57, 209];
    },
    {
      name: "betPlaced";
      discriminator: [88, 88, 145, 226, 126, 206, 32, 0];
    },
    {
      name: "gameStateUpdated";
      discriminator: [99, 254, 30, 16, 56, 188, 169, 0];
    },
    {
      name: "maintenanceToggled";
      discriminator: [202, 159, 95, 118, 112, 164, 70, 140];
    },
    {
      name: "roundCancelled";
      discriminator: [238, 141, 105, 175, 182, 158, 15, 7];
    },
    {
      name: "roundClosed";
      discriminator: [45, 243, 28, 22, 132, 70, 175, 226];
    },
    {
      name: "roundCreated";
      discriminator: [16, 19, 68, 117, 87, 198, 7, 124];
    },
    {
      name: "roundFinished";
      discriminator: [219, 203, 57, 176, 225, 115, 234, 93];
    },
    {
      name: "roundStarted";
      discriminator: [180, 209, 2, 244, 238, 48, 170, 120];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "betTooSmall";
      msg: "Bet amount is below minimum";
    },
    {
      code: 6001;
      name: "invalidRound";
      msg: "Invalid round";
    },
    {
      code: 6002;
      name: "roundFinished";
      msg: "Round is already finished";
    },
    {
      code: 6003;
      name: "invalidRoundStatus";
      msg: "Round is not in the correct status";
    },
    {
      code: 6004;
      name: "roundNotFinished";
      msg: "Round time has not passed yet";
    },
    {
      code: 6005;
      name: "notEnoughBets";
      msg: "Not enough bets placed";
    },
    {
      code: 6006;
      name: "calculationDelayNotPassed";
      msg: "Calculation delay not passed";
    },
    {
      code: 6007;
      name: "activeRoundExists";
      msg: "Active round already exists";
    },
    {
      code: 6008;
      name: "invalidBet";
      msg: "Invalid bet for this round";
    },
    {
      code: 6009;
      name: "unauthorizedOperator";
      msg: "Only authorized operator can perform this action";
    },
    {
      code: 6010;
      name: "gameUnderMaintenance";
      msg: "Game is under maintenance";
    },
    {
      code: 6011;
      name: "betAccountFull";
      msg: "Bet account is full";
    },
    {
      code: 6012;
      name: "invalidBetAccount";
      msg: "Invalid bet account";
    },
    {
      code: 6013;
      name: "invalidWinningNumber";
      msg: "Invalid winning number";
    },
    {
      code: 6014;
      name: "invalidWinner";
      msg: "Invalid winner";
    },
    {
      code: 6015;
      name: "calculationError";
      msg: "Calculation error";
    },
    {
      code: 6016;
      name: "roundExpired";
      msg: "Round expired";
    },
    {
      code: 6017;
      name: "invalidServerSeed";
      msg: "Invalid server seed";
    },
    {
      code: 6018;
      name: "invalidBlockNumber";
      msg: "Invalid Block Number";
    },
    {
      code: 6019;
      name: "invalidTotalBets";
      msg: "Invalid total bets";
    },
    {
      code: 6020;
      name: "invalidTotalAmount";
      msg: "Invalid total amount";
    },
    {
      code: 6021;
      name: "invalidTotalTickets";
      msg: "Invalid total tickets";
    },
    {
      code: 6022;
      name: "invalidFeeAccount";
      msg: "Invalid Fee Account";
    },
    {
      code: 6023;
      name: "invalidRoundDuration";
      msg: "Invalid round duration";
    },
    {
      code: 6024;
      name: "invalidCalculationDelay";
      msg: "Invalid calculation delay";
    },
    {
      code: 6025;
      name: "invalidMinBets";
      msg: "Invalid minimum bets";
    },
    {
      code: 6026;
      name: "invalidMinimumBet";
      msg: "Invalid minimum bet amount";
    },
    {
      code: 6027;
      name: "invalidFeePercentage";
      msg: "Invalid fee percentage (must be between 0 and 1000)";
    },
    {
      code: 6028;
      name: "invalidGasFees";
      msg: "Invalid gas fees";
    },
    {
      code: 6029;
      name: "maxBetsPerAccountReached";
      msg: "Maximum bets per account reached";
    },
    {
      code: 6030;
      name: "cannotCloseActiveRound";
      msg: "Cannot close active round";
    }
  ];
  types: [
    {
      name: "bet";
      type: {
        kind: "struct";
        fields: [
          {
            name: "roundId";
            type: "u64";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "startNumber";
            type: "u64";
          },
          {
            name: "endNumber";
            type: "u64";
          },
          {
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "betAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "player";
            type: "pubkey";
          },
          {
            name: "totalBets";
            type: "u64";
          },
          {
            name: "totalAmount";
            type: "u64";
          },
          {
            name: "totalWins";
            type: "u64";
          },
          {
            name: "totalWinsAmount";
            type: "u64";
          },
          {
            name: "bets";
            type: {
              vec: {
                defined: {
                  name: "bet";
                };
              };
            };
          }
        ];
      };
    },
    {
      name: "betAccountInitialized";
      type: {
        kind: "struct";
        fields: [
          {
            name: "player";
            type: "pubkey";
          },
          {
            name: "betAccount";
            type: "pubkey";
          },
          {
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "betPlaced";
      type: {
        kind: "struct";
        fields: [
          {
            name: "roundId";
            type: "u64";
          },
          {
            name: "player";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "startNumber";
            type: "u64";
          },
          {
            name: "endNumber";
            type: "u64";
          },
          {
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "betQueue";
      type: {
        kind: "struct";
        fields: [
          {
            name: "totalBets";
            type: "u64";
          },
          {
            name: "totalAmount";
            type: "u64";
          },
          {
            name: "nextBetNumber";
            type: "u64";
          },
          {
            name: "nextRoundId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "gameState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "feeAccount";
            type: "pubkey";
          },
          {
            name: "currentRoundId";
            type: "u64";
          },
          {
            name: "totalRounds";
            type: "u64";
          },
          {
            name: "isMaintenance";
            type: "bool";
          },
          {
            name: "roundDuration";
            type: "i64";
          },
          {
            name: "calculationDelay";
            type: "i64";
          },
          {
            name: "minBets";
            type: "u8";
          },
          {
            name: "minimumBet";
            type: "u64";
          },
          {
            name: "feePercentage";
            type: "i16";
          },
          {
            name: "gasFees";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "gameStateUpdated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "roundDuration";
            type: "i64";
          },
          {
            name: "calculationDelay";
            type: "i64";
          },
          {
            name: "minBets";
            type: "u8";
          },
          {
            name: "minimumBet";
            type: "u64";
          },
          {
            name: "feePercentage";
            type: "i16";
          },
          {
            name: "feeAccount";
            type: "pubkey";
          },
          {
            name: "gasFees";
            type: "u64";
          },
          {
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "maintenanceToggled";
      type: {
        kind: "struct";
        fields: [
          {
            name: "isMaintenance";
            type: "bool";
          },
          {
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "round";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "u64";
          },
          {
            name: "status";
            type: {
              defined: {
                name: "roundStatus";
              };
            };
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "startedAt";
            type: "i64";
          },
          {
            name: "totalBets";
            type: "u64";
          },
          {
            name: "totalAmount";
            type: "u64";
          },
          {
            name: "nextBetNumber";
            type: "u64";
          },
          {
            name: "winner";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "winningNumber";
            type: "u64";
          },
          {
            name: "serverSeed";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "blockNumber";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "roundCancelled";
      type: {
        kind: "struct";
        fields: [
          {
            name: "roundId";
            type: "u64";
          },
          {
            name: "totalBets";
            type: "u64";
          },
          {
            name: "totalAmount";
            type: "u64";
          },
          {
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "roundClosed";
      type: {
        kind: "struct";
        fields: [
          {
            name: "roundId";
            type: "u64";
          },
          {
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "roundCreated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "roundId";
            type: "u64";
          },
          {
            name: "totalBets";
            type: "u64";
          },
          {
            name: "totalAmount";
            type: "u64";
          },
          {
            name: "totalTickets";
            type: "u64";
          },
          {
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "roundFinished";
      type: {
        kind: "struct";
        fields: [
          {
            name: "roundId";
            type: "u64";
          },
          {
            name: "winner";
            type: "pubkey";
          },
          {
            name: "winningNumber";
            type: "u64";
          },
          {
            name: "prizeAmount";
            type: "u64";
          },
          {
            name: "feeAmount";
            type: "u64";
          },
          {
            name: "gasFees";
            type: "u64";
          },
          {
            name: "blockhash";
            type: "string";
          },
          {
            name: "blockNumber";
            type: "u64";
          },
          {
            name: "serverSeed";
            type: "string";
          },
          {
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "roundStarted";
      type: {
        kind: "struct";
        fields: [
          {
            name: "roundId";
            type: "u64";
          },
          {
            name: "totalBets";
            type: "u64";
          },
          {
            name: "totalAmount";
            type: "u64";
          },
          {
            name: "totalTickets";
            type: "u64";
          },
          {
            name: "serverSeed";
            type: "string";
          },
          {
            name: "blockNumber";
            type: "u64";
          },
          {
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "roundStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "open";
          },
          {
            name: "started";
          },
          {
            name: "finished";
          },
          {
            name: "cancelled";
          }
        ];
      };
    }
  ];
};
