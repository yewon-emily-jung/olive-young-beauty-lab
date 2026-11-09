import type {ClientId} from './clients';
export type LipRegion={path:string;center:[number,number];width:number;height:number};
/** Intrinsic-pixel contours calibrated on the current v3 portraits, not shared cartoon lips. */
export const lipRegions:Record<ClientId,LipRegion>={
 chloe:{path:'M 578 723 C 599 717 614 700 634 694 C 644 690 651 697 660 699 C 670 698 676 692 687 696 C 705 703 721 714 743 719 C 727 734 714 755 686 764 C 665 772 644 767 628 762 C 608 752 589 738 578 723 Z',center:[660,725],width:166,height:76},
 rin:{path:'M 551 679 C 569 671 584 655 602 649 C 611 644 619 653 630 654 C 640 654 644 646 653 650 C 674 655 686 669 707 678 C 695 690 680 709 659 719 C 639 728 615 725 600 717 C 579 708 563 693 551 679 Z',center:[630,679],width:156,height:77},
 jisoo:{path:'M 461 828 C 483 822 499 807 520 802 C 532 797 541 806 550 808 C 560 807 567 800 577 805 C 596 812 618 821 635 827 C 621 844 606 866 581 874 C 561 882 541 882 520 875 C 497 867 475 845 461 828 Z',center:[550,832],width:174,height:82},
 alex:{path:'M 479 780 C 499 776 518 758 540 753 C 551 747 559 758 569 760 C 580 758 587 750 597 755 C 619 761 635 774 655 779 C 640 795 620 816 594 824 C 574 834 554 833 533 825 C 512 816 491 797 479 780 Z',center:[568,783],width:176,height:82}
};
export type BlushRegion={cx:number;cy:number;rx:number;ry:number;angle:number};
export const blushRegions:Partial<Record<ClientId,BlushRegion[]>>={
 chloe:[{cx:500,cy:583,rx:92,ry:56,angle:-17},{cx:827,cy:579,rx:85,ry:52,angle:15}],
 rin:[{cx:472,cy:552,rx:81,ry:51,angle:-12},{cx:795,cy:548,rx:83,ry:50,angle:13}]
};
