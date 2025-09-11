def get_kmer(genome,k): 
    kmers=[] 
    for i in range(len(genome)-k+1): #loop to get all kmers 
        genome_kmer=genome[i:i+k] 
        kmers.append(genome_kmer) 
    return kmers 
 
def most_freq_kmer(genome,k): 
    kmer_count={} # Dictionary containing the count of each kmer 
    kmer_list=get_kmer(genome,k) 
    for i in kmer_list: 
        if i in kmer_count: 
            kmer_count[i]+=1 
        else: 
            kmer_count[i]=1 
    largest_count=0 
    for i in kmer_count: 
        if kmer_count[i]>largest_count: 
            largest_count=kmer_count[i] 
    freq_kmers=[] 
    for i in kmer_count: # To get all kmers with the largest count 
        if kmer_count[i]==largest_count: 
            freq_kmers.append(i) 
    return freq_kmers,largest_count 
 
def get_skew(genome): 
    skew=[0] 
    for i in genome: #loop to get skew array 
        if i=="G" or i=="g": 
            skew.append(skew[-1]+1) 
        elif i=="C" or i=="c": 
            skew.append(skew[-1]-1) 
        else: 
            skew.append(skew[-1]) 
    return skew 
def get_min_skew(genome): 
    skew=get_skew(genome) 
    mini=min(skew) #gives the minimum value in the skew array 
    min_index=skew.index(mini) 
    return min_index

def get_oric(genome_org,l,t,k,index): 
    genome=genome_org[index:index+500] 
    clumps=[] 
    if l>=len(genome): #dividing the OriC into two cases : 
                        #l is greater than genome length and 
                        # l is smaller than genome length 

        window=genome 
        counts={} 
        for i in range(len(window)-k+1): # loop to get all kmers in the window 
             
            kmer=window[i:i+k] 
            if kmer in counts: 
                counts[kmer]+=1 
            else: 
                counts[kmer]=1 
        for kmer in counts: 
            if counts[kmer]>=t and kmer not in clumps: #appending the kmer to clumps if 
                                                    #its count is greater than or equal to t 
                clumps.append(kmer) 
    else: 
        for i in range(len(genome)-l+1): # loop to get all windows of length l in the genome 
            window=genome[i:i+l] 
            counts={} 
            for j in range(len(window)-k+1): # loop to get all kmers in the window 
                kmer=window[j:j+k] 
                if kmer in counts: 
                    counts[kmer]+=1 
                else: 
                    counts[kmer]=1 
            for kmer in counts: 
                if counts[kmer]>=t and kmer not in clumps: #appending the kmer to clumps if 
                                                    #its count is greater than or equal to t 
                    clumps.append(kmer) 
    return clumps 
 
genome=input("Enter the genome: ") 
k=int(input("Enter the value of k: ")) 
l=int(input("Enter the length of the window: ")) 
t=int(input("Enter the minimum number of occurrences: ")) 
 
print("The kmers are: ",get_kmer(genome,k)) 
print("Most frequent k-mers and their count: ",most_freq_kmer(genome,k)) 
print("Skew array: ",get_skew(genome)) 
print("Index of minimum skew: ",get_min_skew(genome)) 
print("The clumps are: ",get_oric(genome,l,t,k,get_min_skew(genome)))