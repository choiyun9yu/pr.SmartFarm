import math
import os
import numpy as np
from pathlib import Path

def Another(ROOT):
    
    exp_path = str(ROOT/'runs/detect/exp')
    with open(exp_path+"/fiststage.txt", "r") as f:
        txt = f.readlines()  

    GinseongCoordinate, HeadCoordinate, GinseongAllList, DetactedAllList, best = [], [], [], [], []
    NearestGinseong, conveyer, feeder = float('inf'), 0, 0
    angle, x_coordinate, y_coordinate =  None, None, None

    [GinseongCoordinate.append(i) if i[0] == '0' else HeadCoordinate.append(i) for i in txt]
    Gamount, Hamount = len(GinseongCoordinate), len(HeadCoordinate)


    for i in range(Gamount):
        g = GinseongCoordinate[i][2:-1].split(' ')
        gltx, glty, grbx, grby = int(g[0]), int(g[1]), int(g[2]), int(g[3])
        lt, rt, lb, rb = [gltx, glty], [grbx, glty], [gltx, grby], [grbx, grby]
        globals()["g{}".format(i)] = [lt, rt, lb, rb]

        for j in range(Hamount):
            h = HeadCoordinate[j][2:-1].split(' ')
            hltx, hlty, hrbx, hrby = int(h[0]), int(h[1]), int(h[2]), int(h[3])
            globals()["h{}".format(j)] = [int((hltx+hrbx)/2), int((hlty+hrby)/2)]
            if (globals()[f"g{i}"][3][0] > globals()[f"h{j}"][0] > globals()[f"g{i}"][0][0])\
            and (globals()[f"g{i}"][3][1] > globals()[f"h{j}"][1] > globals()[f"g{i}"][0][1]):
                globals()["g{}".format(i)].append(globals()["h{}".format(j)])

        GinseongAllList.append(globals()["g{}".format(i)])

    if len(GinseongAllList) < 4:
        conveyer = 1 
    else: 
        for i in GinseongAllList:
            if len(i) == 5:
                DetactedAllList.append(i)

        if len(DetactedAllList) <= 3:
            feeder = 1
        else: 
            for k in DetactedAllList:
                if NearestGinseong > k[0][0]:
                        NearestGinseong = k[0][0]   
            for i,value in enumerate(DetactedAllList):
                if NearestGinseong == value[0][0]:
                    best = globals()["g{}".format(i)]
                    globals()["g{}".format(i)] = np.array(globals()["g{}".format(i)])
                    alt = abs(globals()["g{}".format(i)][0]-globals()["g{}".format(i)][-1])
                    art = abs(globals()["g{}".format(i)][1]-globals()["g{}".format(i)][-1])
                    alb = abs(globals()["g{}".format(i)][2]-globals()["g{}".format(i)][-1])
                    arb = abs(globals()["g{}".format(i)][3]-globals()["g{}".format(i)][-1])
                    altu, artu = int(math.sqrt((alt[0]**2)+(alt[1]**2))), int(math.sqrt((art[0]**2)+(art[1]**2)))
                    albu, arbu = int(math.sqrt((alb[0]**2)+(alb[1]**2))), int(math.sqrt((arb[0]**2)+(arb[1]**2)))
                    bgc = {'LT':altu, 'RT':artu, 'LB':albu, 'RB':arbu}
                    bgc_sorted=sorted(bgc.items(), key=lambda x:x[1])
                    if bgc_sorted[1][1] - bgc_sorted[0][1] < 20:
                        if bgc_sorted[0][0] == 'RT' and bgc_sorted[1][0] == 'RB':
                            angle=0
                        elif bgc_sorted[1][0] == 'RT' and bgc_sorted[0][0] == 'RB':
                            angle=0
                        elif bgc_sorted[0][0] == 'LT'and bgc_sorted[1][0] == 'RT': 
                            angle=90
                        elif bgc_sorted[1][0] == 'LT'and bgc_sorted[0][0] == 'RT':
                            angle=90
                        elif bgc_sorted[0][0] == 'LT' and bgc_sorted[1][0] == 'LB':
                            angle=180
                        elif bgc_sorted[1][0] == 'LT' and bgc_sorted[0][0] == 'LB':
                            angle=180
                        elif bgc_sorted[0][0] == 'LB' and bgc_sorted[1][0] == 'RB': 
                            angle=270
                        elif bgc_sorted[1][0] == 'LB' and bgc_sorted[0][0] == 'RB':
                            angle=270
                    else:
                        if bgc_sorted[0][0] == 'RT':
                            angle=45
                        elif bgc_sorted[0][0] == 'LT':
                            angle=135
                        elif bgc_sorted[0][0] == 'LB': 
                            angle=225
                        elif bgc_sorted[0][0] == 'RB':
                            angle=315
                    x_coordinate = best[-1][0]
                    y_coordinate = best[-1][1]
                else:
                    best = []
            feeder = 0
            conveyer = 0

    with open(exp_path+"/result.txt", 'w') as f:
        f.write(f'{len(GinseongAllList)} {conveyer} {len(DetactedAllList)} {feeder} {angle} {x_coordinate} {y_coordinate}')
    return 