package com.test.homework;

public class GameInfo {

	static int score[][]=new int[4][];
	static String question[];
	
	private String username;
	private int manchoice;

	public void PersonInfo() {
		username = "";
		manchoice = 0;
	}
	
	public void GameSet(){
		score[0]=new int[]{20,15,10,5,20,15,5,10,15,20,10,5,20,15,5,10,15,10,20,5};
		score[1]=new int[]{10,20,15,5,20,15,5,10,10,15,5,20,15,20,5,10,15,10,20,5};
		score[2]=new int[]{5,15,10,20,20,15,5,10,20,10,5,10,15,20,10,5,15,5,20,10};
		score[3]=new int[]{5,10,20,15,15,10,20,5,5,20,10,15,20,10,5,15,15,20,10,5};
		question=new String[]
				{"Q1. 그와 식사를 하던 도중, 그의 이에 낀 음식물을 보았다. 나는 어떻게 해야 할까? \n"
				+"\t1. 바로 사실을 말해 준다. \n"
				+"\t2. 대충 돌려서 말해 준다. \n"
				+"\t3. 사랑스럽게 직접 빼준다. \n"
				+"\t4. 무시한다. \n\n"
				+"1 ~ 4 중 선택하세요. >> ",
				"Q2. 음식을 다 먹고 그가 계산을 했다. 이 때 나는 어떻게 행동을 할까? \n"
				+"\t1. \"커피는 제가 살게요\"라고 말한다. \n"
				+"\t2. \"잘 먹었어요\"라고 말한다. \n"
				+"\t3. \"계좌를 불러주세요.\"라고 말한다. \n"
				+"\t4. 그냥 조용히 기다린다. \n\n"
				+"1 ~ 4 중 선택하세요. >> ",
				"Q3. 식사를 끝낸 후, 어디로 가야할까? \n"
				+"\t1. 이야기를 더 나눌 수 있는 카페 \n"
				+"\t2. 좀 더 가까워질 수 있는 술집 \n"
				+"\t3. 나의 매력을 보여줄 수 있는 노래방 \n"
				+"\t4. 그와 모든 것을 할 수 있는 그 방... \n\n"
				+"1 ~ 4 중 선택하세요. >> ",
				"Q4. 데이트를 끝내고 집에 가야할 시간이다. 마침 집 방향이 같은데 나는 어떻게 해야할까? \n"
				+"\t1. \"한 잔 할래요~?\"라고 말한다. \n"
				+"\t2. 다음 만남을 기약하기 위해 같이 걸어간다. \n"
				+"\t3. 밀당을 하기 위해 약속이 있다고 그를 혼자 보낸다. \n"
				+"\t4. 차가 끊긴 것 같다고 거짓말을 한다. \n\n"
				+"1 ~ 4 중 선택하세요. >> ",
				"Q5. 헤어지고 난 뒤 그에게 메세지가 왔다. 나는 어떻게 할까? \n"
				+"\t1. 전화를 한다. \n"
				+"\t2. 내일 답장을 한다. \n"
				+"\t3. 솔직한 나의 감정을 말한다. \n"
				+"\t4. 읽고 십는다. \n\n"
				+"1 ~ 4 중 선택하세요. >> "
				};
	}
	public void setUsername(String username){this.username=username;}
	public String getUsername(){return this.username;}
	public void setManchoice(int manchoice){this.manchoice=manchoice;}
	public int getManchoice(){return this.manchoice;}

}