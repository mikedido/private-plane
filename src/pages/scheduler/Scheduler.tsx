import data from '../../data/reservation';
import dataInstructeur from '../../data/instructeurs';
import dataClassroom from '../../data/classroom';
import CalendarSchedular from '../scheduler/Calendar';


interface Reservation {
    id: number,
    eleve: string,
    moniteur: string,
    date: string,
    heure_debut: string,
    heure_fin: string
}

interface TimeDriving {
    id: number,
    eleve: string,
    moniteur: string,
    date: string,
    heure_debut: string,
    heure_fin: string
} 

interface Voiture {
    id: number,
    modele: string,
    immatriculation: string,
    reservations: Reservation[],
    time_driving: TimeDriving[],
}


const Scheduler = () => {

    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 8; hour < 18; hour++) {
          for (let minute = 0; minute < 60; minute += 5) {
            slots.push(`${hour}:${minute.toString().padStart(2, '0')}`);
          }
        }
        return slots;
      };
    
      const timeSlots = generateTimeSlots();
    
      const calculateColspan = (start: string, end: string) => {
        const [startHour, startMinute] = start.split(':').map(Number);
        const [endHour, endMinute] = end.split(':').map(Number);
    
        const startTotalMinutes = startHour * 60 + startMinute;
        const endTotalMinutes = endHour * 60 + endMinute;
    
        return (endTotalMinutes - startTotalMinutes) / 5;
      };

    
      const isTimeInRange = (time: string, start: string, end: string) => {
        const [hour, minute] = time.split(':').map(Number);
        const [startHour, startMinute] = start.split(':').map(Number);
        const [endHour, endMinute] = end.split(':').map(Number);
      
        const timeValue = hour * 60 + minute;
        const startValue = startHour * 60 + startMinute;
        const endValue = endHour * 60 + endMinute;
      
        return timeValue >= startValue && timeValue < endValue;
      };


      return (
        <>
        <CalendarSchedular />
        <table>
            <thead>
            <tr style={{ textAlign: 'center'}}>
                <th>Avions</th>
                {timeSlots.map((slot, index) => (
                    index % 6 === 0 ? <th key={slot} colSpan={6}>{slot}</th> : null
                ))}
            </tr>
            {/* <tr>
                <th></th>
                {timeSlots.map(slot => (
                <th key={slot}>{slot}</th>
                ))}
            </tr> */}
            </thead>
            <tbody>
                {/* avion table */}
                {data.map((voiture: Voiture) => (
                    <>
                    <tr key={voiture.id}>
                    <td style={{ padding: 10}}>
                        <span style={{ fontSize: 16}} className='voiture-model'>{voiture.modele}</span><br />
                        <span style={{ fontSize: 12}} className='voitre-immatriculation'>{voiture.immatriculation}</span>
                    </td>
                    {timeSlots.map(slot => {
                        const reservation = voiture.reservations.find(res => res.heure_debut === slot);
                        
                        if (reservation) {
                            const colspan = calculateColspan(reservation.heure_debut, reservation.heure_fin);
                            return (
                                <td key={slot} colSpan={colspan} className="reservation-cell" style={{ border : 0}}>
                                    <div className="reservation">
                                    {`${reservation.eleve} avec ${reservation.moniteur}`}
                                    </div>
                                </td>              
                            );
                        }
                        // Si une réservation commence à ce créneau, sautez les cellules suivantes
                        if (voiture.reservations.some(res => isTimeInRange(slot, res.heure_debut, res.heure_fin))) {
                            return null;
                        }
                        else {
                            const time = slot.split(':');

                            if (time["1"] == "00") {
                                return <td key={slot} style={{borderRight: 1 }}></td>;
                            } 
                            else if (time["1"] == "25") {
                                return <td key={slot} style={{borderLeft: 1 }}></td>;  
                            } else if (time["1"] == "55") {
                                return <td key={slot} style={{borderLeft: 1 }}></td>; 
                            }
                            else {
                                return <td key={slot} style={{ border: 0 }}></td>;
                            }
                        }
                    })}
                    </tr>
                    <tr key={voiture.id} style={{ backgroundColor: "#F0F8FF" }}>
                    <td style={{ padding: 5}}>
                        <span style={{ fontSize: 12}} className='voiture-model'>Restants : 42:15</span><br />
                        {/* <span style={{ fontSize: 12}} className='voitre-immatriculation'>Vols : 1:45</span> */}
                    </td>
                    {timeSlots.map(slot => {
                        const reservation = voiture.time_driving.find(res => res.heure_debut === slot);
                        
                        if (reservation) {
                            const colspan = calculateColspan(reservation.heure_debut, reservation.heure_fin);
                            return (
                                <td key={slot} colSpan={colspan} className="timiing-flight-cell" style={{ border : 0}}>
                                    <div className="time-flight">
                                    {`${reservation.eleve} avec ${reservation.moniteur}`}
                                    </div>
                                </td>              
                            );
                        }
                        // Si une réservation commence à ce créneau, sautez les cellules suivantes
                        if (voiture.time_driving.some(res => isTimeInRange(slot, res.heure_debut, res.heure_fin))) {
                            return null;
                        }
                        else {
                            const time = slot.split(':');

                            if (time["1"] == "00") {
                                return <td key={slot} style={{borderRight: 1 }}></td>;
                            } 
                            else if (time["1"] == "25") {
                                return <td key={slot} style={{borderLeft: 1 }}></td>;  
                            } else if (time["1"] == "55") {
                                return <td key={slot} style={{borderLeft: 1 }}></td>; 
                            }
                            else {
                                return <td key={slot} style={{ border: 0 }}></td>;
                            }
                        }
                    })}
                    </tr>
                    </>    
                ))}
            </tbody>
        </table>

        {/* classroom table */}
        <table>
            <thead>
            <tr style={{ textAlign: 'center'}}>
                <th>Classroom</th>
                {timeSlots.map((slot, index) => (
                    index % 6 === 0 ? <th key={slot} colSpan={6}>{slot}</th> : null
                ))}
            </tr>
            {/* <tr>
                <th></th>
                {timeSlots.map(slot => (
                <th key={slot}>{slot}</th>
                ))}
            </tr> */}
            </thead>
            <tbody>
                {/* avion table */}
                {dataClassroom.map((voiture) => (
                    <tr key={voiture.id}>
                    <td style={{ padding: 10}}>
                        <span style={{ fontSize: 16}} className='voiture-model'>{voiture.name}</span><br />
                        <span style={{ fontSize: 12}} className='voitre-immatriculation'>{voiture.immatriculation}</span>
                    </td>
                    {timeSlots.map(slot => {
                        const reservation = voiture.reservations.find(res => res.heure_debut === slot);
                        
                        if (reservation) {
                            const colspan = calculateColspan(reservation.heure_debut, reservation.heure_fin);
                            return (
                                <td key={slot} colSpan={colspan} className="reservation-cell" style={{ border : 0}}>
                                    <div className="reservation">
                                    {`${reservation.eleve} avec ${reservation.moniteur}`}
                                    </div>
                                </td>              
                            );
                        }
                        // Si une réservation commence à ce créneau, sautez les cellules suivantes
                        if (voiture.reservations.some(res => isTimeInRange(slot, res.heure_debut, res.heure_fin))) {
                            return null;
                        }
                        else {
                            const time = slot.split(':');

                            if (time["1"] == "00") {
                                return <td key={slot} style={{borderRight: 1 }}></td>;
                            } 
                            else if (time["1"] == "25") {
                                return <td key={slot} style={{borderLeft: 1 }}></td>;  
                            } else if (time["1"] == "55") {
                                return <td key={slot} style={{borderLeft: 1 }}></td>; 
                            }
                            else {
                                return <td key={slot} style={{ border: 0 }}></td>;
                            }
                        }
                    })} 
                    </tr>   
                ))}
            </tbody>
        </table>  
        {/* instructeur table */}
        <table>
            <thead>
            <tr style={{ textAlign: 'center'}}>
                <th>Instructeurs</th>
                {timeSlots.map((slot, index) => (
                    index % 6 === 0 ? <th key={slot} colSpan={6}>{slot}</th> : null
                ))}
            </tr>
            {/* <tr>
                <th></th>
                {timeSlots.map(slot => (
                <th key={slot}>{slot}</th>
                ))}
            </tr> */}
            </thead>
            <tbody>
                {/* avion table */}
                {dataInstructeur.map((voiture) => (
                    <>
                    <tr key={voiture.id}>
                    <td style={{ padding: 10}}>
                        <span style={{ fontSize: 16}} className='voiture-model'>{voiture.lastName} {voiture.firstName}</span><br />
                        <span style={{ fontSize: 12}} className='voitre-immatriculation'>{voiture.immatriculation}</span>
                    </td>
                    {timeSlots.map(slot => {
                        const reservation = voiture.reservations.find(res => res.heure_debut === slot);
                        
                        if (reservation) {
                            const colspan = calculateColspan(reservation.heure_debut, reservation.heure_fin);
                            return (
                                <td key={slot} colSpan={colspan} className="reservation-cell" style={{ border : 0}}>
                                    <div className="reservation">
                                    {`${reservation.eleve} avec ${reservation.moniteur}`}
                                    </div>
                                </td>              
                            );
                        }
                        // Si une réservation commence à ce créneau, sautez les cellules suivantes
                        if (voiture.reservations.some(res => isTimeInRange(slot, res.heure_debut, res.heure_fin))) {
                            return null;
                        }
                        else {
                            const time = slot.split(':');

                            if (time["1"] == "00") {
                                return <td key={slot} style={{borderRight: 1 }}></td>;
                            } 
                            else if (time["1"] == "25") {
                                return <td key={slot} style={{borderLeft: 1 }}></td>;  
                            } else if (time["1"] == "55") {
                                return <td key={slot} style={{borderLeft: 1 }}></td>; 
                            }
                            else {
                                return <td key={slot} style={{ border: 0 }}></td>;
                            }
                        }
                    })}
                    </tr>
                    <tr key={voiture.id} style={{ backgroundColor: "#F0F8FF" }}>
                    <td style={{ padding: 5}}>
                        <span style={{ fontSize: 12}} className='voiture-model'>Vols : 2:15</span><br />
                        {/* <span style={{ fontSize: 12}} className='voitre-immatriculation'>Vols : 1:45</span> */}
                    </td>
                    {timeSlots.map(slot => {
                        const reservation = voiture.time_driving.find(res => res.heure_debut === slot);
                        
                        if (reservation) {
                            const colspan = calculateColspan(reservation.heure_debut, reservation.heure_fin);
                            return (
                                <td key={slot} colSpan={colspan} className="timiing-flight-cell" style={{ border : 0}}>
                                    <div className="time-flight">
                                    {`${reservation.eleve} avec ${reservation.moniteur}`}
                                    </div>
                                </td>              
                            );
                        }
                        // Si une réservation commence à ce créneau, sautez les cellules suivantes
                        if (voiture.time_driving.some(res => isTimeInRange(slot, res.heure_debut, res.heure_fin))) {
                            return null;
                        }
                        else {
                            const time = slot.split(':');

                            if (time["1"] == "00") {
                                return <td key={slot} style={{borderRight: 1 }}></td>;
                            } 
                            else if (time["1"] == "25") {
                                return <td key={slot} style={{borderLeft: 1 }}></td>;  
                            } else if (time["1"] == "55") {
                                return <td key={slot} style={{borderLeft: 1 }}></td>; 
                            }
                            else {
                                return <td key={slot} style={{ border: 0 }}></td>;
                            }
                        }
                    })}
                    </tr>
                    </>    
                ))}
            </tbody>
        </table>
        </>
    )
};

export default Scheduler;