/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/coinflip.json`.
 */
export type Coinflip = {
  address: "xx5Q5ZW2eB9DwADZzH21TyZdE5QNHWDVbVaUGbhgMkP";
  metadata: {
    name: "coinflip";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "closeGame";
      discriminator: [237, 236, 157, 201, 253, 20, 248, 67];
      accounts: [
        {
          name: "gameConfig";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  105,
                  110,
                  102,
                  108,
                  105,
                  112,
                  95,
                  103,
                  97,
                  109,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ];
              }
            ];
          };
        },
        {
          name: "game";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  105,
                  110,
                  102,
                  108,
                  105,
                  112,
                  95,
                  103,
                  97,
                  109,
                  101,
                  95,
                  115,
                  101,
                  101,
                  100
                ];
              },
              {
                kind: "account";
                path: "game.creator";
                account: "game";
              },
              {
                kind: "account";
                path: "game.id";
                account: "game";
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
      name: "createGame";
      discriminator: [124, 69, 75, 66, 184, 220, 72, 206];
      accounts: [
        {
          name: "gameConfig";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  105,
                  110,
                  102,
                  108,
                  105,
                  112,
                  95,
                  103,
                  97,
                  109,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ];
              }
            ];
          };
        },
        {
          name: "playerStats";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  105,
                  110,
                  102,
                  108,
                  105,
                  112,
                  95,
                  112,
                  108,
                  97,
                  121,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
                ];
              },
              {
                kind: "account";
                path: "creator";
              }
            ];
          };
        },
        {
          name: "game";
          writable: true;
        },
        {
          name: "creator";
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
          name: "betAmount";
          type: "u64";
        },
        {
          name: "creatorChoice";
          type: "u8";
        }
      ];
    },
    {
      name: "finishGame";
      discriminator: [168, 120, 86, 113, 64, 116, 2, 146];
      accounts: [
        {
          name: "gameConfig";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  105,
                  110,
                  102,
                  108,
                  105,
                  112,
                  95,
                  103,
                  97,
                  109,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ];
              }
            ];
          };
        },
        {
          name: "game";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  105,
                  110,
                  102,
                  108,
                  105,
                  112,
                  95,
                  103,
                  97,
                  109,
                  101,
                  95,
                  115,
                  101,
                  101,
                  100
                ];
              },
              {
                kind: "account";
                path: "game.creator";
                account: "game";
              },
              {
                kind: "account";
                path: "game.id";
                account: "game";
              }
            ];
          };
        },
        {
          name: "creatorStats";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  105,
                  110,
                  102,
                  108,
                  105,
                  112,
                  95,
                  112,
                  108,
                  97,
                  121,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
                ];
              },
              {
                kind: "account";
                path: "game.creator";
                account: "game";
              }
            ];
          };
        },
        {
          name: "playerStats";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  105,
                  110,
                  102,
                  108,
                  105,
                  112,
                  95,
                  112,
                  108,
                  97,
                  121,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
                ];
              },
              {
                kind: "account";
                path: "game.player";
                account: "game";
              }
            ];
          };
        },
        {
          name: "creator";
          writable: true;
        },
        {
          name: "player";
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
        }
      ];
    },
    {
      name: "initPlayerStats";
      discriminator: [92, 93, 11, 83, 66, 83, 240, 178];
      accounts: [
        {
          name: "playerStats";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  105,
                  110,
                  102,
                  108,
                  105,
                  112,
                  95,
                  112,
                  108,
                  97,
                  121,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
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
          name: "gameConfig";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  105,
                  110,
                  102,
                  108,
                  105,
                  112,
                  95,
                  103,
                  97,
                  109,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ];
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
      name: "joinGame";
      discriminator: [107, 112, 18, 38, 56, 173, 60, 128];
      accounts: [
        {
          name: "game";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  105,
                  110,
                  102,
                  108,
                  105,
                  112,
                  95,
                  103,
                  97,
                  109,
                  101,
                  95,
                  115,
                  101,
                  101,
                  100
                ];
              },
              {
                kind: "account";
                path: "game.creator";
                account: "game";
              },
              {
                kind: "account";
                path: "game.id";
                account: "game";
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
      name: "startGame";
      discriminator: [249, 47, 252, 172, 184, 162, 245, 14];
      accounts: [
        {
          name: "gameConfig";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  105,
                  110,
                  102,
                  108,
                  105,
                  112,
                  95,
                  103,
                  97,
                  109,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ];
              }
            ];
          };
        },
        {
          name: "game";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  105,
                  110,
                  102,
                  108,
                  105,
                  112,
                  95,
                  103,
                  97,
                  109,
                  101,
                  95,
                  115,
                  101,
                  101,
                  100
                ];
              },
              {
                kind: "account";
                path: "game.creator";
                account: "game";
              },
              {
                kind: "account";
                path: "game.id";
                account: "game";
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
          name: "gameConfig";
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
          name: "gameConfig";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  105,
                  110,
                  102,
                  108,
                  105,
                  112,
                  95,
                  103,
                  97,
                  109,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
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
          name: "gameDuration";
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
      name: "game";
      discriminator: [27, 90, 166, 125, 74, 100, 121, 18];
    },
    {
      name: "gameConfig";
      discriminator: [45, 146, 146, 33, 170, 69, 96, 133];
    },
    {
      name: "playerStats";
      discriminator: [169, 146, 242, 176, 102, 118, 231, 172];
    }
  ];
  events: [
    {
      name: "gameClosed";
      discriminator: [178, 203, 179, 224, 43, 18, 209, 4];
    },
    {
      name: "gameConfigInitialized";
      discriminator: [215, 134, 22, 167, 128, 105, 21, 1];
    },
    {
      name: "gameConfigUpdated";
      discriminator: [206, 0, 150, 51, 215, 134, 165, 180];
    },
    {
      name: "gameCreated";
      discriminator: [218, 25, 150, 94, 177, 112, 96, 2];
    },
    {
      name: "gameFinished";
      discriminator: [0, 128, 235, 237, 115, 180, 62, 221];
    },
    {
      name: "gameStarted";
      discriminator: [222, 247, 78, 255, 61, 184, 156, 41];
    },
    {
      name: "maintenanceToggled";
      discriminator: [202, 159, 95, 118, 112, 164, 70, 140];
    },
    {
      name: "playerJoined";
      discriminator: [39, 144, 49, 106, 108, 210, 183, 38];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "gameUnderMaintenance";
      msg: "Game is under maintenance";
    },
    {
      code: 6001;
      name: "unauthorizedOperator";
      msg: "Only authorized operator can perform this action";
    },
    {
      code: 6002;
      name: "invalidGameDuration";
      msg: "Invalid game duration";
    },
    {
      code: 6003;
      name: "invalidCalculationDelay";
      msg: "Invalid calculation delay";
    },
    {
      code: 6004;
      name: "invalidMinimumBet";
      msg: "Invalid minimum bet amount";
    },
    {
      code: 6005;
      name: "invalidFeePercentage";
      msg: "Invalid fee percentage (must be between 0 and 1000)";
    },
    {
      code: 6006;
      name: "invalidGasFees";
      msg: "Invalid gas fees";
    },
    {
      code: 6007;
      name: "invalidServerSeed";
      msg: "Invalid server seed";
    },
    {
      code: 6008;
      name: "betTooSmall";
      msg: "Bet amount is below minimum";
    },
    {
      code: 6009;
      name: "invalidChoice";
      msg: "Invalid choice (must be 0 or 1)";
    },
    {
      code: 6010;
      name: "gameNotJoinable";
      msg: "Game is not joinable";
    },
    {
      code: 6011;
      name: "gameNotStartable";
      msg: "Game cannot be started";
    },
    {
      code: 6012;
      name: "cannotJoinOwnGame";
      msg: "Cannot join own game";
    },
    {
      code: 6013;
      name: "betAmountMismatch";
      msg: "Bet amount mismatch";
    },
    {
      code: 6014;
      name: "betResultMismatch";
      msg: "Bet result mismatch";
    },
    {
      code: 6015;
      name: "calculationError";
      msg: "Calculation error";
    },
    {
      code: 6016;
      name: "gameNotFinished";
      msg: "Game not finished";
    },
    {
      code: 6017;
      name: "gameIncomplete";
      msg: "Game incomplete - missing winner or player";
    },
    {
      code: 6018;
      name: "gameNotFinishable";
      msg: "Game not finishable";
    },
    {
      code: 6019;
      name: "invalidFeeAccount";
      msg: "Invalid fee account";
    },
    {
      code: 6020;
      name: "calculationDelayNotPassed";
      msg: "Calculation delay not passed";
    },
    {
      code: 6021;
      name: "invalidGameStatus";
      msg: "Invalid game status";
    },
    {
      code: 6022;
      name: "noPlayerJoined";
      msg: "No player joined";
    },
    {
      code: 6023;
      name: "invalidBlockNumber";
      msg: "Invalid block number";
    },
    {
      code: 6024;
      name: "invalidGameId";
      msg: "Invalid game ID";
    }
  ];
  types: [
    {
      name: "game";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "u64";
          },
          {
            name: "creator";
            type: "pubkey";
          },
          {
            name: "status";
            type: {
              defined: {
                name: "gameStatus";
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
            name: "finishedAt";
            type: "i64";
          },
          {
            name: "duration";
            type: "i64";
          },
          {
            name: "betAmount";
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
            type: {
              option: "u64";
            };
          },
          {
            name: "creatorChoice";
            type: "u8";
          },
          {
            name: "result";
            type: {
              option: "u8";
            };
          },
          {
            name: "winner";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "player";
            type: {
              option: "pubkey";
            };
          }
        ];
      };
    },
    {
      name: "gameClosed";
      type: {
        kind: "struct";
        fields: [
          {
            name: "gameId";
            type: "u64";
          },
          {
            name: "creator";
            type: "pubkey";
          },
          {
            name: "player";
            type: "pubkey";
          },
          {
            name: "winner";
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
      name: "gameConfig";
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
            name: "isMaintenance";
            type: "bool";
          },
          {
            name: "gameDuration";
            type: "i64";
          },
          {
            name: "calculationDelay";
            type: "i64";
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
      name: "gameConfigInitialized";
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
            name: "gameDuration";
            type: "i64";
          },
          {
            name: "calculationDelay";
            type: "i64";
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
          },
          {
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "gameConfigUpdated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "gameDuration";
            type: "i64";
          },
          {
            name: "calculationDelay";
            type: "i64";
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
      name: "gameCreated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "gameId";
            type: "u64";
          },
          {
            name: "creator";
            type: "pubkey";
          },
          {
            name: "betAmount";
            type: "u64";
          },
          {
            name: "creatorChoice";
            type: "u8";
          },
          {
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "gameFinished";
      type: {
        kind: "struct";
        fields: [
          {
            name: "gameId";
            type: "u64";
          },
          {
            name: "creator";
            type: "pubkey";
          },
          {
            name: "player";
            type: "pubkey";
          },
          {
            name: "creatorChoice";
            type: "u8";
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
            name: "blockhash";
            type: "string";
          },
          {
            name: "result";
            type: "u8";
          },
          {
            name: "winner";
            type: "pubkey";
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
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "gameStarted";
      type: {
        kind: "struct";
        fields: [
          {
            name: "gameId";
            type: "u64";
          },
          {
            name: "creator";
            type: "pubkey";
          },
          {
            name: "player";
            type: "pubkey";
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
            name: "startedAt";
            type: "i64";
          },
          {
            name: "duration";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "gameStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "waitingForPlayer";
          },
          {
            name: "waitingStart";
          },
          {
            name: "inProgress";
          },
          {
            name: "finished";
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
      name: "playerJoined";
      type: {
        kind: "struct";
        fields: [
          {
            name: "gameId";
            type: "u64";
          },
          {
            name: "creator";
            type: "pubkey";
          },
          {
            name: "player";
            type: "pubkey";
          },
          {
            name: "betAmount";
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
      name: "playerStats";
      type: {
        kind: "struct";
        fields: [
          {
            name: "player";
            type: "pubkey";
          },
          {
            name: "totalGamesCreated";
            type: "u64";
          },
          {
            name: "totalGamesWon";
            type: "u64";
          },
          {
            name: "totalGamesLost";
            type: "u64";
          },
          {
            name: "totalAmountWon";
            type: "u64";
          },
          {
            name: "totalAmountLost";
            type: "u64";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "updatedAt";
            type: "i64";
          }
        ];
      };
    }
  ];
};
