import type {ClientId} from './clients';
export type EyeRegion={id:string;path:string;shimmer:[number,number][]};
/** Intrinsic image pixels, calibrated on both Rin v3 bare and complexion portraits.
 * Lower contours follow the upper lash lines; color and shimmer share the same mask. */
export const eyeRegions:Partial<Record<ClientId,EyeRegion[]>>={chloe:[
 {id:'left',path:'M 470 481 C 484 457 510 447 538 449 C 558 450 577 468 584 491 C 568 475 551 463 535 464 C 510 463 487 474 470 481 Z',shimmer:[[505,458],[530,455],[551,461]]},
 {id:'right',path:'M 711 488 C 726 458 748 445 774 444 C 797 444 817 452 832 471 C 814 465 795 459 775 459 C 749 457 728 475 711 488 Z',shimmer:[[746,459],[771,452],[795,454]]}
],rin:[
 {id:'left',path:'M 451 435 C 462 413 482 404 507 405 C 531 405 548 419 557 440 C 544 429 528 421 509 421 C 486 421 467 428 451 435 Z',shimmer:[[480,416],[501,414],[525,418]]},
 {id:'right',path:'M 666 441 C 680 415 706 402 735 402 C 759 401 779 410 792 426 C 774 422 757 417 735 418 C 710 418 684 427 666 441 Z',shimmer:[[707,413],[731,410],[757,412]]}
]};
