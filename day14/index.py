import re

def maskedIntToBins(n, mask):
    unmasked = intToBin(n)
    for i in range(len(mask)):
        if mask[i] == "1":
            unmasked[i] = 1
        elif mask[i] == "X":
            unmasked[i] = "X"
    def recur(unmaskedN, ret):
        if "X" not in unmaskedN:
            ret.append(unmaskedN)
            return
        for i in range(len(unmaskedN)):
            if unmaskedN[i] == "X":
                res = [unmaskedN.copy(), unmaskedN.copy()]
                res[0][i] = 0
                res[1][i] = 1
                assert len(res[0]) == 36
                return [recur(res[0],ret), recur(res[1],ret)]
    ret = []
    recur(unmasked, ret)
    
    return ret

def intToBin(n):
    res = [0] * 36
    i, sigBit = 0, 2**35
    while n != 0:
        if (n - sigBit) >= 0:
            n = n - sigBit
            res[i] = 1
        i += 1
        sigBit = sigBit / 2
    return res

def maskedIntToBin(n, mask):
    unmasked = intToBin(n)
    for i in range(len(mask)):
        if mask[i] != "X":
            unmasked[i] = int(mask[i])
    return unmasked

def binToInt(bin):
    res = 0
    sigBit = 2**35
    for i in range(len(bin)):
        if bin[i] == 1:
            res += sigBit
        sigBit = int(sigBit/2)
    return res

def main():
    memory = {}
    reMem = re.compile("mem\[([0-9]+)\] = ([0-9]+)")
    reMask = re.compile("(X|0|1){36}")
    input = [e.rstrip() for e in open("input.txt")]
    for e in input:
        if "mask = " in e:
            mask = re.search(reMask,e).group(0)
        else:
            newmem = (int(re.match(reMem,e).group(1)), int(re.match(reMem,e).group(2)))
            for e in maskedIntToBins(newmem[0],mask):
                memory[binToInt(e)] = newmem[1]
    
    res = 0
    for e in memory:
        res += memory[e]
    return res

print(main())